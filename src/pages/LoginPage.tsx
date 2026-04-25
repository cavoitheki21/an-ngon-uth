import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTE_PATHS } from '@/lib/index';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phone: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Đăng nhập thành công! 🎉');
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background flex flex-col">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-primary to-accent px-6 pt-14 pb-10 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full" />
        <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white mb-6">
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🍽️</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Xin chào!</h1>
            <p className="text-white/75 text-sm">Đăng nhập để đặt món ngay</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Số điện thoại</Label>
            <div className="relative">
              <Phone size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="0901 234 567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="pl-10 h-12 rounded-xl border-border bg-muted/40 focus:bg-background text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">Mật khẩu</Label>
            <div className="relative">
              <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pl-10 pr-10 h-12 rounded-xl border-border bg-muted/40 focus:bg-background text-base"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-primary text-sm font-medium">
              Quên mật khẩu?
            </button>
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-13 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 mt-2"
              style={{ height: 52, boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 35%)' }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </div>
              ) : 'Đăng nhập'}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">hoặc đăng nhập với</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social login */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🇬', label: 'Google', color: '#4285F4' },
            { icon: '📘', label: 'Facebook', color: '#1877F2' },
          ].map(({ icon, label }) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.96 }}
              onClick={() => toast.info(`Đăng nhập bằng ${label} (demo)`)}
              className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors text-sm font-medium"
            >
              <span className="text-lg">{icon}</span>
              {label}
            </motion.button>
          ))}
        </div>

        {/* Student ID login */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { setForm({ phone: '22110001', password: '123456' }); }}
          className="w-full mt-3 h-12 rounded-xl border-2 border-dashed border-primary/50 text-primary text-sm font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
        >
          🎓 Đăng nhập bằng MSSV
        </motion.button>
      </div>

      {/* Register link */}
      <div className="px-6 pb-10 text-center">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link to={ROUTE_PATHS.REGISTER} className="text-primary font-semibold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
