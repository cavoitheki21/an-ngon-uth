import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight, MapPin, Bell, Shield, HelpCircle, LogOut,
  Star, Gift, Wallet, Edit3, Award, Zap
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { SAMPLE_USER } from '@/data/mockData';
import { ROUTE_PATHS } from '@/lib/index';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const MENU_ITEMS = [
  {
    section: 'Tài khoản',
    items: [
      { icon: MapPin, label: 'Địa chỉ giao hàng', sub: '2 địa chỉ đã lưu', color: 'text-primary', bg: 'bg-primary/10' },
      { icon: Wallet, label: 'Ví & Thanh toán', sub: 'MoMo, ZaloPay, Ngân hàng', color: 'text-chart-3', bg: 'bg-chart-3/10' },
      { icon: Gift, label: 'Voucher của tôi', sub: '3 voucher chưa dùng', color: 'text-accent', bg: 'bg-accent/10', badge: '3' },
    ],
  },
  {
    section: 'Ưu đãi',
    items: [
      { icon: Award, label: 'Điểm tích lũy', sub: `${SAMPLE_USER.points} điểm`, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      { icon: Zap, label: 'Giới thiệu bạn bè', sub: 'Nhận 50K mỗi người', color: 'text-purple-600', bg: 'bg-purple-100' },
    ],
  },
  {
    section: 'Hỗ trợ',
    items: [
      { icon: Bell, label: 'Thông báo', sub: 'Quản lý thông báo đẩy', color: 'text-blue-600', bg: 'bg-blue-100' },
      { icon: Shield, label: 'Bảo mật & Quyền riêng tư', sub: 'Mật khẩu, xác thực 2 lớp', color: 'text-destructive', bg: 'bg-destructive/10' },
      { icon: HelpCircle, label: 'Trợ giúp & Liên hệ', sub: 'FAQ, Chat hỗ trợ 24/7', color: 'text-muted-foreground', bg: 'bg-muted' },
    ],
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = SAMPLE_USER;
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-24 overflow-x-hidden">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, oklch(0.65 0.18 35), oklch(0.72 0.16 45))' }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-5 w-16 h-16 bg-white/10 rounded-full" />

        <div className="flex items-start justify-between mb-5">
          <h1 className="text-white font-bold text-xl">Trang cá nhân</h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Edit3 size={16} className="text-white" />
          </motion.button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-white/30 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-chart-3 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-extrabold text-lg leading-tight">{user.name}</h2>
            <p className="text-white/75 text-sm mt-0.5">MSSV: {user.studentId}</p>
            <p className="text-white/75 text-xs mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { value: '32', label: 'Đơn hàng', icon: '🛵' },
            { value: `${user.points}`, label: 'Điểm', icon: '⭐' },
            { value: '4.9', label: 'Đánh giá', icon: '❤️' },
          ].map(({ value, label, icon }) => (
            <div key={label} className="bg-white/15 rounded-2xl px-3 py-2.5 text-center">
              <p className="text-white font-extrabold text-lg leading-none">{value}</p>
              <p className="text-white/70 text-[10px] mt-0.5 flex items-center justify-center gap-1">
                <span>{icon}</span>{label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Card */}
      <div className="mx-4 -mt-3 mb-1 z-10 relative">
        <div
          className="rounded-3xl p-4 flex items-center justify-between shadow-xl border border-primary/20"
          style={{ background: 'linear-gradient(135deg, oklch(0.99 0.005 85), oklch(0.96 0.015 75))' }}
        >
          <div>
            <p className="text-xs text-muted-foreground font-medium">Thẻ sinh viên UTH</p>
            <p className="font-bold text-base text-foreground mt-0.5">{user.name}</p>
            <p className="font-mono text-xs text-muted-foreground">{user.studentId}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <span className="text-[10px] font-bold text-primary">UTH MEMBER</span>
          </div>
        </div>
      </div>

      {/* Loyalty bar */}
      <div className="mx-4 mt-3 bg-card rounded-2xl border border-border/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star size={14} className="fill-yellow-400 stroke-yellow-400" />
            <p className="font-bold text-sm">Hội viên Bạc</p>
          </div>
          <span className="text-xs text-muted-foreground">Còn 750đ nữa lên Vàng →</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '62.5%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">{user.points}/2000 điểm</p>
      </div>

      {/* Menu sections */}
      <div className="px-4 mt-4 space-y-4">
        {MENU_ITEMS.map(({ section, items }) => (
          <div key={section}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">{section}</p>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {items.map(({ icon: Icon, label, sub, color, bg, badge }, i) => (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors text-left',
                    i > 0 && 'border-t border-border/50'
                  )}
                >
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', bg)}>
                    <Icon size={17} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground truncate">{sub}</p>
                  </div>
                  {badge ? (
                    <span className="bg-destructive text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                      {badge}
                    </span>
                  ) : (
                    <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            toast('Đã đăng xuất', { description: 'Hẹn gặp lại bạn! 👋' });
            setTimeout(() => navigate(ROUTE_PATHS.SPLASH), 800);
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-destructive/40 text-destructive font-semibold text-sm hover:bg-destructive/5 transition-colors"
        >
          <LogOut size={16} />
          Đăng xuất
        </motion.button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Ăn Ngon UTH v1.0.0 · Phát triển bởi Team UTH 🎓
        </p>
      </div>

      <BottomNav activePath={ROUTE_PATHS.PROFILE} />
    </div>
  );
}
