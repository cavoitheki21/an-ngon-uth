import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTE_PATHS } from '@/lib/index';

const SPLASH_STEPS = [
  { emoji: '🍜', text: 'Đang khởi động...', delay: 0 },
  { emoji: '🚀', text: 'Chuẩn bị món ngon...', delay: 1000 },
  { emoji: '✨', text: 'Sẵn sàng!', delay: 2000 },
];

export default function SplashPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    SPLASH_STEPS.forEach((s, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setStep(i), s.delay));
      }
    });
    timers.push(setTimeout(() => navigate(ROUTE_PATHS.ONBOARDING), 3200));
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-gradient-to-br from-primary via-accent to-orange-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/15 rounded-full blur-2xl" />

      {/* Floating food emojis */}
      {['🍜', '🍔', '🍗', '🧋', '🥗', '🍮'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl select-none"
          style={{
            top: `${10 + i * 13}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
          }}
          animate={{
            y: [-8, 8, -8],
            rotate: [-5, 5, -5],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-28 h-28 bg-white rounded-3xl shadow-2xl flex items-center justify-center"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
          <span className="text-5xl">🍽️</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Ăn Ngon</h1>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="bg-white/20 text-white font-bold text-sm px-3 py-0.5 rounded-full tracking-widest">
              UTH
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-white/80 text-center mt-5 text-base px-8"
      >
        Đặt đồ ăn ngon • Giao tận nơi • Cho sinh viên UTH
      </motion.p>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-16 flex flex-col items-center gap-3"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-white/70 text-sm"
          >
            {SPLASH_STEPS[step]?.text}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-2">
          {SPLASH_STEPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === step ? 24 : 8,
                opacity: i === step ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className="h-2 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
