import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';

const SLIDES = [
  {
    emoji: '🛵',
    title: 'Giao hàng siêu tốc',
    subtitle: 'Đặt món và nhận hàng trong vòng 20 phút ngay tại ký túc xá hoặc phòng học UTH.',
    bg: 'from-orange-400/20 to-red-400/10',
    dot: 'bg-primary',
  },
  {
    emoji: '🍜',
    title: 'Hàng trăm món ngon',
    subtitle: 'Từ bún bò Huế, cơm tấm, phở bò đến trà sữa, burger – đầy đủ khẩu vị cho sinh viên.',
    bg: 'from-yellow-400/20 to-orange-400/10',
    dot: 'bg-accent',
  },
  {
    emoji: '💰',
    title: 'Giá sinh viên – Ví sinh viên',
    subtitle: 'Voucher hàng ngày, tích điểm đổi quà, freeship cho đơn từ 50K. Tiết kiệm mỗi bữa ăn!',
    bg: 'from-green-400/20 to-teal-400/10',
    dot: 'bg-chart-3',
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate(ROUTE_PATHS.LOGIN);
    }
  };

  const skip = () => navigate(ROUTE_PATHS.LOGIN);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-5">
        {current < SLIDES.length - 1 && (
          <button onClick={skip} className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">
            Bỏ qua
          </button>
        )}
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center gap-6"
          >
            {/* Illustration */}
            <div className={`w-56 h-56 rounded-full bg-gradient-to-br ${SLIDES[current].bg} flex items-center justify-center`}>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                className="text-8xl"
              >
                {SLIDES[current].emoji}
              </motion.span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-foreground leading-tight">
                {SLIDES[current].title}
              </h2>
              <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
                {SLIDES[current].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="px-8 pb-10 flex flex-col gap-6 items-center">
        {/* Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 24 : 8,
                opacity: i === current ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
              className="h-2 bg-primary rounded-full cursor-pointer"
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        {/* Next button */}
        <motion.div whileTap={{ scale: 0.97 }} className="w-full">
          <Button
            onClick={goNext}
            className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            style={{ boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 40%)' }}
          >
            {current < SLIDES.length - 1 ? (
              <span className="flex items-center gap-2">
                Tiếp theo <ChevronRight size={18} />
              </span>
            ) : (
              'Bắt đầu ngay!'
            )}
          </Button>
        </motion.div>

        {current === SLIDES.length - 1 && (
          <button
            onClick={() => navigate(ROUTE_PATHS.REGISTER)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Chưa có tài khoản? <span className="text-primary font-semibold">Đăng ký miễn phí</span>
          </button>
        )}
      </div>
    </div>
  );
}
