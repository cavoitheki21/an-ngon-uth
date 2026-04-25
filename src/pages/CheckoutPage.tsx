import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice, PAYMENT_METHODS, ROUTE_PATHS } from '@/lib/index';
import { SAMPLE_USER } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const DELIVERY_FEE = 10000;
const VOUCHER_DISCOUNT = 15000;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const subtotal = getTotalPrice();
  const total = subtotal + DELIVERY_FEE - VOUCHER_DISCOUNT;
  const [selectedAddress, setSelectedAddress] = useState(SAMPLE_USER.addresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState('momo');
  const [loading, setLoading] = useState(false);
  const [orderNote, setOrderNote] = useState('');

  const handleOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    setLoading(false);
    navigate(ROUTE_PATHS.ORDER_SUCCESS);
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 border-b border-border/50 px-4 pt-12 pb-4"
        style={{ backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
            <ArrowLeft size={18} />
          </motion.button>
          <h1 className="font-bold text-lg">Xác nhận đơn hàng</h1>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Delivery Address */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 pt-4 pb-2">
            <MapPin size={16} className="text-primary" />
            <p className="font-bold text-sm">Địa chỉ giao hàng</p>
          </div>
          {SAMPLE_USER.addresses.map((addr) => (
            <motion.div
              key={addr.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAddress(addr.id)}
              className={cn(
                'flex items-start gap-3 px-4 py-3 cursor-pointer border-t border-border/50 transition-colors',
                selectedAddress === addr.id ? 'bg-primary/5' : 'hover:bg-muted/40'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
                selectedAddress === addr.id ? 'border-primary bg-primary' : 'border-muted-foreground'
              )}>
                {selectedAddress === addr.id && <Check size={10} className="text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">Mặc định</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{addr.detail}</p>
              </div>
            </motion.div>
          ))}
          <div className="px-4 py-3 border-t border-border/50">
            <button className="text-primary text-sm font-semibold flex items-center gap-1">
              <span>+ Thêm địa chỉ mới</span>
            </button>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-sm">Món đã chọn ({items.length})</p>
            <button onClick={() => navigate(ROUTE_PATHS.CART)}
              className="text-primary text-xs font-medium flex items-center gap-0.5">
              Sửa <ChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.image} alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-primary flex-shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 pt-4 pb-2">
            <CreditCard size={16} className="text-primary" />
            <p className="font-bold text-sm">Phương thức thanh toán</p>
          </div>
          {PAYMENT_METHODS.map((pm) => (
            <motion.div
              key={pm.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPayment(pm.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 cursor-pointer border-t border-border/50 transition-colors',
                selectedPayment === pm.id ? 'bg-primary/5' : 'hover:bg-muted/40'
              )}
            >
              <span className="text-xl">{pm.icon}</span>
              <span className="flex-1 text-sm font-medium">{pm.label}</span>
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                selectedPayment === pm.id ? 'border-primary bg-primary' : 'border-muted-foreground'
              )}>
                {selectedPayment === pm.id && <Check size={10} className="text-white" />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="font-bold text-sm mb-2">Ghi chú đơn hàng</p>
          <textarea
            placeholder="Ghi chú cho tài xế, yêu cầu đặc biệt..."
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            className="w-full bg-muted/40 rounded-xl px-3 py-2.5 text-sm resize-none h-16 focus:outline-none focus:ring-1 focus:ring-primary border border-border placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Price summary */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="font-bold text-sm mb-3">Chi tiết thanh toán</p>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí giao hàng</span>
              <span className="font-medium">{formatPrice(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chart-3 font-medium">Voucher giảm</span>
              <span className="text-chart-3 font-bold">-{formatPrice(VOUCHER_DISCOUNT)}</span>
            </div>
            <div className="pt-2.5 border-t border-border flex justify-between items-center">
              <span className="font-bold">Tổng thanh toán</span>
              <span className="font-extrabold text-primary text-lg">{formatPrice(Math.max(0, total))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/95 border-t border-border p-4"
        style={{ backdropFilter: 'blur(12px)' }}>
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleOrder}
            disabled={loading || items.length === 0}
            className="w-full h-13 text-base font-bold rounded-2xl bg-primary text-primary-foreground"
            style={{ height: 52, boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 35%)' }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang đặt hàng...
              </div>
            ) : `🛵 Đặt hàng ngay • ${formatPrice(Math.max(0, total))}`}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
