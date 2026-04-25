import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Star, Clock, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { FOOD_ITEMS, SAMPLE_REVIEWS } from '@/data/mockData';
import { useCart } from '@/hooks/useCart';
import { formatPrice, ROUTE_PATHS } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function FoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = FOOD_ITEMS.find((f) => f.id === id) ?? FOOD_ITEMS[0];
  const { addItem, getTotalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [notes, setNotes] = useState('');
  const [showDesc, setShowDesc] = useState(true);
  const [activeOption, setActiveOption] = useState<string[]>([]);
  const totalInCart = getTotalItems();

  const SIZE_OPTIONS = ['Nhỏ', 'Vừa (+5K)', 'Lớn (+10K)'];
  const TOPPING_OPTIONS = ['Trứng cút (+5K)', 'Phô mai (+8K)', 'Đồ chua thêm', 'Ớt thêm'];

  const handleAddToCart = () => {
    addItem(food, quantity, notes);
    toast.success(`✅ Đã thêm ${quantity} ${food.name}`, {
      description: `Tổng: ${formatPrice(food.price * quantity)}`,
      action: {
        label: 'Xem giỏ hàng',
        onClick: () => navigate(ROUTE_PATHS.CART),
      },
    });
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-32">
      {/* Hero image */}
      <div className="relative h-72">
        <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Top actions */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 rounded-2xl flex items-center justify-center shadow-md"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 bg-white/90 rounded-2xl flex items-center justify-center shadow-md"
            >
              <Heart size={18} className={cn(isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-foreground')} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/90 rounded-2xl flex items-center justify-center shadow-md">
              <Share2 size={18} className="text-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {food.isPopular && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              🔥 Phổ biến
            </span>
          )}
          {food.isSale && food.originalPrice && (
            <span className="bg-destructive text-white text-xs font-bold px-3 py-1 rounded-full">
              -{Math.round((1 - food.price / food.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Cart icon */}
        {totalInCart > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(ROUTE_PATHS.CART)}
            className="absolute bottom-4 right-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg"
          >
            <ShoppingCart size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalInCart}
            </span>
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-5">
        {/* Header info */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-extrabold text-foreground leading-tight flex-1">{food.name}</h1>
            <div className="text-right flex-shrink-0">
              <p className="text-primary font-bold text-xl">{formatPrice(food.price)}</p>
              {food.originalPrice && (
                <p className="text-muted-foreground text-sm line-through">{formatPrice(food.originalPrice)}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-1">{food.restaurant}</p>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg">
              <Star size={13} className="fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-bold text-foreground">{food.rating}</span>
              <span className="text-xs text-muted-foreground">({food.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-lg">
              <Clock size={13} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{food.prepTime}</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {food.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] h-5 px-2">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 bg-muted/40 rounded-2xl p-4">
          <button
            onClick={() => setShowDesc(!showDesc)}
            className="flex items-center justify-between w-full"
          >
            <p className="font-semibold text-sm">Mô tả món ăn</p>
            {showDesc ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showDesc && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-sm text-muted-foreground mt-2 leading-relaxed overflow-hidden"
              >
                {food.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Options: Size */}
        <div className="mt-4">
          <p className="font-semibold text-sm mb-2">Kích thước</p>
          <div className="flex gap-2">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveOption((prev) =>
                  prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev.filter((o) => !SIZE_OPTIONS.includes(o)), opt]
                )}
                className={cn(
                  'flex-1 py-2 rounded-xl text-xs font-semibold border transition-all',
                  activeOption.includes(opt)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-background border-border text-muted-foreground'
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Toppings */}
        <div className="mt-4">
          <p className="font-semibold text-sm mb-2">Thêm topping</p>
          <div className="grid grid-cols-2 gap-2">
            {TOPPING_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveOption((prev) =>
                  prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
                )}
                className={cn(
                  'py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all',
                  activeOption.includes(opt)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-background border-border text-muted-foreground'
                )}
              >
                {activeOption.includes(opt) ? '✓ ' : ''}{opt}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <p className="font-semibold text-sm mb-2">Ghi chú cho quán</p>
          <textarea
            placeholder="Ví dụ: không cay, ít đường, extra sauce..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground resize-none h-16 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Reviews preview */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm">Đánh giá ({food.reviewCount})</p>
            <button className="text-primary text-xs font-semibold">Xem tất cả</button>
          </div>
          {SAMPLE_REVIEWS.slice(0, 2).map((rv) => (
            <div key={rv.id} className="flex gap-3 mb-3">
              <img src={rv.avatar} alt={rv.userName} className="w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1 bg-muted/40 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold">{rv.userName}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < rv.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-muted-foreground fill-none'} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{rv.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Add to Cart */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/95 border-t border-border p-4"
        style={{ backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-3 bg-muted rounded-2xl px-2 py-2">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-background rounded-xl flex items-center justify-center shadow-sm"
            >
              <Minus size={14} />
            </motion.button>
            <span className="font-bold text-base w-6 text-center">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-sm"
            >
              <Plus size={14} className="text-white" />
            </motion.button>
          </div>

          {/* Add button */}
          <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
            <Button
              onClick={handleAddToCart}
              className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm"
              style={{ boxShadow: '0 6px 20px oklch(0.65 0.18 35 / 40%)' }}
            >
              Thêm vào giỏ • {formatPrice(food.price * quantity)}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
