import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Tag, ChevronRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice, ROUTE_PATHS } from '@/lib/index';
import { Button } from '@/components/ui/button';

const DELIVERY_FEE = 10000;
const VOUCHER_DISCOUNT = 15000;

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const subtotal = getTotalPrice();
  const total = subtotal + DELIVERY_FEE - VOUCHER_DISCOUNT;
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 border-b border-border/50 px-4 pt-12 pb-4"
        style={{ backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.button>
            <h1 className="font-bold text-lg">Giỏ hàng</h1>
          </div>
          {!isEmpty && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
              {getTotalItems()} món
            </span>
          )}
        </div>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="text-8xl">🛒</span>
          </motion.div>
          <h3 className="font-bold text-xl mt-5 text-foreground">Giỏ hàng trống</h3>
          <p className="text-muted-foreground mt-2 text-sm">Hãy thêm món ăn ngon vào giỏ hàng nhé!</p>
          <Button
            onClick={() => navigate(ROUTE_PATHS.MENU)}
            className="mt-6 px-8 h-12 rounded-2xl bg-primary text-primary-foreground font-bold"
          >
            Khám phá thực đơn 🍜
          </Button>
        </div>
      ) : (
        <div className="px-4 mt-4">
          {/* Restaurant info */}
          <div className="flex items-center gap-3 bg-primary/5 rounded-2xl p-3 mb-4 border border-primary/15">
            <span className="text-2xl">🏪</span>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Đặt từ</p>
              <p className="font-semibold text-sm">{items[0]?.restaurant}</p>
            </div>
            <span className="text-xs text-primary font-medium">Đang mở cửa 🟢</span>
          </div>

          {/* Cart items */}
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="bg-card rounded-2xl p-3 flex gap-3 shadow-sm border border-border/50"
                >
                  <img src={item.image} alt={item.name} className="w-18 h-18 object-cover rounded-xl flex-shrink-0"
                    style={{ width: 72, height: 72 }} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">{item.name}</h3>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground italic mt-0.5 truncate">📝 {item.notes}</p>
                    )}
                    <p className="text-primary font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-muted rounded-xl px-2 py-1">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-background rounded-lg flex items-center justify-center text-foreground"
                        >
                          <Minus size={12} />
                        </motion.button>
                        <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center"
                        >
                          <Plus size={12} className="text-white" />
                        </motion.button>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 bg-destructive/10 rounded-xl flex items-center justify-center"
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add more */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(ROUTE_PATHS.MENU)}
            className="w-full mt-3 py-3 rounded-2xl border-2 border-dashed border-primary/40 text-primary text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
          >
            <Plus size={16} />
            Thêm món khác
          </motion.button>

          {/* Voucher */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="mt-4 bg-card rounded-2xl p-3 flex items-center gap-3 border border-border/50 cursor-pointer"
          >
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Tag size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Áp dụng voucher</p>
              <p className="text-xs text-chart-3 font-medium">🎉 UTH2024 – Giảm {formatPrice(VOUCHER_DISCOUNT)}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.div>

          {/* Order Summary */}
          <div className="mt-4 bg-card rounded-2xl p-4 border border-border/50">
            <p className="font-bold text-sm mb-3">Tóm tắt đơn hàng</p>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính ({getTotalItems()} món)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí giao hàng</span>
                <span className="font-medium">{formatPrice(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-chart-3 font-medium">Giảm giá voucher</span>
                <span className="text-chart-3 font-bold">-{formatPrice(VOUCHER_DISCOUNT)}</span>
              </div>
              <div className="border-t border-border pt-2.5 flex justify-between">
                <span className="font-bold">Tổng cộng</span>
                <span className="font-extrabold text-primary text-lg">{formatPrice(Math.max(0, total))}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-3 text-xs text-muted-foreground text-center bg-muted/40 rounded-xl p-2.5">
            🚵 Thời gian giao dự kiến: <span className="font-semibold text-foreground">15–25 phút</span>
          </div>
        </div>
      )}

      {/* Bottom checkout */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/95 border-t border-border p-4"
          style={{ backdropFilter: 'blur(12px)' }}>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate(ROUTE_PATHS.CHECKOUT)}
              className="w-full h-13 text-base font-bold rounded-2xl bg-primary text-primary-foreground"
              style={{ height: 52, boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 35%)' }}
            >
              <ShoppingBag size={18} className="mr-2" />
              Đặt hàng • {formatPrice(Math.max(0, total))}
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
