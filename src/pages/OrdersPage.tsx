import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, RefreshCw, Star } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { SAMPLE_ORDERS } from '@/data/mockData';
import { formatPrice, ORDER_STATUS_LABELS, ROUTE_PATHS } from '@/lib/index';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const STATUS_COLOR: Record<string, string> = {
  placed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  delivering: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUS_EMOJI: Record<string, string> = {
  placed: '📋',
  preparing: '👨‍🍳',
  delivering: '🛵',
  delivered: '✅',
  cancelled: '❌',
};

type TabType = 'all' | 'active' | 'delivered' | 'cancelled';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredOrders = SAMPLE_ORDERS.filter((o) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['placed', 'preparing', 'delivering'].includes(o.status);
    return o.status === activeTab;
  });

  const TABS: { id: TabType; label: string; count?: number }[] = [
    { id: 'all', label: 'Tất cả', count: SAMPLE_ORDERS.length },
    { id: 'active', label: 'Đang giao', count: SAMPLE_ORDERS.filter((o) => o.status === 'delivering').length },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 border-b border-border/50"
        style={{ backdropFilter: 'blur(12px)' }}>
        <div className="px-4 pt-12 pb-3">
          <h1 className="font-bold text-xl">Đơn hàng của tôi</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {TABS.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex-shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5',
                activeTab === id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {label}
              {count !== undefined && count > 0 && (
                <span className={cn(
                  'rounded-full min-w-[16px] h-4 flex items-center justify-center text-[9px] font-bold px-1',
                  activeTab === id ? 'bg-white/25' : 'bg-foreground/10'
                )}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">📭</span>
            <p className="font-bold text-lg text-foreground">Chưa có đơn hàng</p>
            <p className="text-muted-foreground text-sm mt-1">Đặt món ngay để bắt đầu!</p>
          </div>
        ) : (
          filteredOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm"
            >
              {/* Order header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <div>
                  <p className="font-mono font-bold text-sm text-foreground">#{order.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.restaurant}</p>
                </div>
                <span className={cn('text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1', STATUS_COLOR[order.status])}>
                  <span>{STATUS_EMOJI[order.status]}</span>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>

              {/* Items preview */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="relative flex-shrink-0">
                      <img src={item.image} alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-border/50" />
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background rounded-full text-[9px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center border border-dashed border-border text-xs text-muted-foreground font-medium">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{new Date(order.createdAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="font-bold text-sm text-primary">{formatPrice(order.total)}</p>
                </div>
              </div>

              {/* Footer actions */}
              <div className="px-4 py-3 border-t border-border/50 flex items-center gap-2">
                {order.status === 'delivering' && (
                  <button
                    onClick={() => navigate(`/tracking/${order.id}`)}
                    className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    🛵 Theo dõi đơn
                  </button>
                )}
                {order.status === 'delivered' && (
                  <>
                    <button
                      onClick={() => navigate(`/reviews/${order.id}`)}
                      className="flex-1 py-2 rounded-xl bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Star size={12} /> Đánh giá
                    </button>
                    <button
                      className="flex-1 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw size={12} /> Đặt lại
                    </button>
                  </>
                )}
                <button
                  onClick={() => navigate(`/tracking/${order.id}`)}
                  className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <BottomNav activePath={ROUTE_PATHS.ORDERS} />
    </div>
  );
}
