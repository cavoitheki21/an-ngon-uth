import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, MapPin, CheckCircle2, Clock, ChefHat, Package, Bike } from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: 'placed',
    label: 'Đặt hàng thành công',
    sublabel: 'Đơn hàng đã được ghi nhận',
    icon: CheckCircle2,
    time: '10:32',
  },
  {
    id: 'confirmed',
    label: 'Quán xác nhận',
    sublabel: 'Quán Bún Bò Dì Ba đã nhận đơn',
    icon: ChefHat,
    time: '10:34',
  },
  {
    id: 'preparing',
    label: 'Đang chuẩn bị',
    sublabel: 'Đầu bếp đang làm món cho bạn',
    icon: Package,
    time: '10:35',
  },
  {
    id: 'delivering',
    label: 'Đang giao hàng',
    sublabel: 'Shipper Minh Tú đang trên đường',
    icon: Bike,
    time: null,
  },
  {
    id: 'delivered',
    label: 'Giao thành công',
    sublabel: 'Chúc bạn ngon miệng! 😋',
    icon: CheckCircle2,
    time: null,
  },
];

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2); // 0-indexed, đang ở bước "preparing"
  const [progress, setProgress] = useState(0);

  // Simulate progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Simulate auto-advance (demo)
  useEffect(() => {
    if (currentStep < 3) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background">
      {/* Header */}
      <div
        className="px-4 pt-12 pb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, oklch(0.65 0.18 35), oklch(0.72 0.16 45))' }}
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(ROUTE_PATHS.HOME)}
            className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </motion.button>
          <h1 className="text-white font-bold text-base">Theo dõi đơn hàng</h1>
          <div className="w-9" />
        </div>

        <div className="bg-white/15 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/75 text-xs">Mã đơn hàng</p>
              <p className="font-mono font-bold text-base">#{orderId ?? 'UTH002024'}</p>
            </div>
            <div className="text-right">
              <p className="text-white/75 text-xs">Dự kiến giao</p>
              <p className="font-bold text-sm flex items-center gap-1">
                <Clock size={13} /> ~12 phút
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-white/80 text-xs mt-1.5">
              {STEPS[currentStep]?.label}
            </p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative h-40 bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden flex items-center justify-center border-b border-border">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="text-center">
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-1"
          >
            🗺️
          </motion.div>
          <p className="text-sm font-medium text-green-800">Bản đồ theo dõi real-time</p>
          <p className="text-xs text-green-600 mt-0.5">Shipper đang trên đường đến bạn</p>
        </div>
        {/* Shipper dot animation */}
        <motion.div
          className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
          animate={{ x: [0, 30, 60, 30, 0], y: [0, -10, 0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '30%', left: '30%' }}
        >
          <span className="text-sm">🛵</span>
        </motion.div>
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
          <MapPin size={12} className="text-white" />
        </div>
      </div>

      {/* Shipper info */}
      <div className="mx-4 mt-4 bg-card rounded-2xl border border-border/50 p-4 flex items-center gap-3">
        <img
          src="https://ui-avatars.com/api/?name=Minh+Tu&background=27AE60&color=fff&size=48"
          alt="Shipper"
          className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <p className="font-bold text-sm">Minh Tú</p>
          <p className="text-xs text-muted-foreground">Shipper • 🌟 4.9 (1.2K chuyến)</p>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono">🏍️ 59Y1-23456</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center"
          >
            <Phone size={16} className="text-primary" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="w-10 h-10 bg-chart-3/10 rounded-2xl flex items-center justify-center"
          >
            <MessageCircle size={16} className="text-chart-3" />
          </motion.button>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mx-4 mt-4 bg-card rounded-2xl border border-border/50 p-4">
        <p className="font-bold text-sm mb-4">Trạng thái đơn hàng</p>
        <div className="space-y-0">
          {STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex gap-3">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={isActive ? { scale: 0.8 } : undefined}
                    animate={isActive ? { scale: [1, 1.1, 1] } : undefined}
                    transition={isActive ? { duration: 1.5, repeat: Infinity } : undefined}
                    className={cn(
                      'w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 border-2',
                      isDone
                        ? 'bg-chart-3/15 border-chart-3'
                        : isActive
                        ? 'bg-primary/15 border-primary'
                        : 'bg-muted border-transparent'
                    )}
                  >
                    <Icon
                      size={16}
                      className={isDone ? 'text-chart-3' : isActive ? 'text-primary' : 'text-muted-foreground'}
                    />
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <div className={cn('w-0.5 h-8 mt-1', isDone ? 'bg-chart-3/40' : 'bg-border')} />
                  )}
                </div>
                {/* Text */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      'text-sm font-semibold',
                      isDone ? 'text-chart-3' : isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step.label}
                    </p>
                    {step.time && (
                      <span className="text-xs text-muted-foreground font-mono">{step.time}</span>
                    )}
                  </div>
                  <p className={cn('text-xs mt-0.5', isDone || isActive ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
                    {step.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order summary */}
      <div className="mx-4 mt-4 mb-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/reviews/${orderId}`)}
          className="w-full h-12 rounded-2xl font-semibold border-border"
        >
          Xem chi tiết đơn hàng
        </Button>
      </div>
    </div>
  );
}
