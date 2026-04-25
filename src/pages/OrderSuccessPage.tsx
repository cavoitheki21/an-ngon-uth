import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Clock, Receipt, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const ORDER_ID = 'UTH' + Math.floor(Math.random() * 100000).toString().padStart(6, '0');

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background flex flex-col items-center justify-between py-10 px-6">
      {/* Success animation */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 w-full">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative"
        >
          <div className="w-28 h-28 bg-chart-3/10 rounded-full flex items-center justify-center">
            <CheckCircle2 size={56} className="text-chart-3" strokeWidth={1.5} />
          </div>
          {/* Confetti dots */}
          {['🎉', '⭐', '🍜', '🔥', '✨'].map((e, i) => (
            <motion.span
              key={i}
              className="absolute text-xl"
              style={{
                top: `${-10 + i * 8}%`,
                left: i % 2 === 0 ? `${-20 + i * 5}%` : undefined,
                right: i % 2 !== 0 ? `${-20 + i * 5}%` : undefined,
              }}
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-2xl font-extrabold text-foreground">Đặt hàng thành công!</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Yay! Đơn hàng của bạn đã được gửi đến quán.<br/>
            Shipper sẽ giao trong khoảng <span className="font-bold text-foreground">15–25 phút</span>.
          </p>
        </motion.div>

        {/* Order ID */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-muted/50 rounded-2xl px-6 py-3 w-full text-center border border-border/50"
        >
          <p className="text-xs text-muted-foreground">Mã đơn hàng</p>
          <p className="font-mono font-bold text-lg text-primary mt-0.5">#{ORDER_ID}</p>
        </motion.div>

        {/* Timeline info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="w-full space-y-3"
        >
          {[
            { icon: Receipt, label: 'Quán đang xác nhận', color: 'text-accent', bg: 'bg-accent/10', done: true },
            { icon: Clock, label: 'Ước tính chuẩn bị 10 phút', color: 'text-chart-4', bg: 'bg-chart-4/10', done: false },
            { icon: MapPin, label: 'Giao đến KTX UTH, Phòng B401', color: 'text-chart-3', bg: 'bg-chart-3/10', done: false },
          ].map(({ icon: Icon, label, color, bg, done }, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-2xl p-3 ${bg}`}>
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <span className={`text-sm font-medium ${done ? color : 'text-foreground'}`}>{label}</span>
              {done && <span className="ml-auto text-xs text-chart-3 font-bold">✓</span>}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full space-y-3 mt-6"
      >
        <Button
          onClick={() => navigate(`/tracking/${ORDER_ID}`)}
          className="w-full h-13 rounded-2xl bg-primary text-primary-foreground font-bold text-base"
          style={{ height: 52, boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 35%)' }}
        >
          🛵 Theo dõi đơn hàng
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(ROUTE_PATHS.HOME)}
          className="w-full h-12 rounded-2xl font-semibold border-border"
        >
          <Home size={16} className="mr-2" />
          Về trang chủ
        </Button>
      </motion.div>
    </div>
  );
}
