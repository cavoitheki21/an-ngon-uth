import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Phone, Lock, User, GraduationCap, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTE_PATHS } from '@/lib/index';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', studentId: '', password: '', confirmPassword: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.name || !form.phone || !form.studentId) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }
      setStep(2);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    if (!form.password || form.password !== form.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Đăng ký thành công! Chào mừng bạn đến với Ăn Ngon UTH 🎉');
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent to-primary px-6 pt-14 pb-10 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="text-white/80 hover:text-white mb-6">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-extrabold text-white">Tạo tài khoản</h1>
        <p className="text-white/75 text-sm mt-1">Dành riêng cho sinh viên UTH</p>
        {/* Progress steps */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                s <= step ? 'bg-white text-primary' : 'bg-white/30 text-white'
              }`}>{s}</div>
              {s < 2 && <div className={`h-0.5 w-12 ${s < step ? 'bg-white' : 'bg-white/30'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8">
        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Họ và tên</Label>
                <div className="relative">
                  <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Nguyễn Văn A" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="pl-10 h-12 rounded-xl bg-muted/40 text-base" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Mã số sinh viên</Label>
                <div className="relative">
                  <GraduationCap size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="22110001" value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    className="pl-10 h-12 rounded-xl bg-muted/40 text-base font-mono" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Số điện thoại</Label>
                <div className="relative">
                  <Phone size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type="tel" placeholder="0901 234 567" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="pl-10 h-12 rounded-xl bg-muted/40 text-base" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Email UTH <span className="text-muted-foreground font-normal">(tuỳ chọn)</span></Label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" placeholder="22110001@uth.edu.vn" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="pl-10 h-12 rounded-xl bg-muted/40 text-base" />
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-3">
                🔒 Tạo mật khẩu bảo mật cho tài khoản của bạn
              </p>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Mật khẩu</Label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type={showPass ? 'text' : 'password'} placeholder="Ít nhất 6 ký tự" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="pl-10 pr-10 h-12 rounded-xl bg-muted/40 text-base" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type="password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="pl-10 h-12 rounded-xl bg-muted/40 text-base" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Bằng cách đăng ký, bạn đồng ý với{' '}
                <span className="text-primary font-medium">Điều khoản sử dụng</span> và{' '}
                <span className="text-primary font-medium">Chính sách bảo mật</span> của chúng tôi.
              </p>
            </>
          )}

          <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
            <Button type="submit" disabled={loading}
              className="w-full h-13 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90"
              style={{ height: 52, boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 35%)' }}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang tạo tài khoản...
                </div>
              ) : step === 1 ? 'Tiếp theo →' : 'Hoàn tất đăng ký 🎉'}
            </Button>
          </motion.div>
        </form>
      </div>

      <div className="px-6 pb-10 text-center">
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{' '}
          <Link to={ROUTE_PATHS.LOGIN} className="text-primary font-semibold hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
