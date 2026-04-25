import { motion } from 'framer-motion';
import { Star, Clock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/index';
import type { FoodItem } from '@/lib/index';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface FoodCardProps {
  food: FoodItem;
  variant?: 'default' | 'horizontal';
}

export function FoodCard({ food, variant = 'default' }: FoodCardProps) {
  const navigate = useNavigate();
  const addItem = useCart((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(food);
    toast.success(`Đã thêm ${food.name}`, {
      description: 'Vào giỏ hàng của bạn',
      duration: 2000,
    });
  };

  if (variant === 'horizontal') {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/food/${food.id}`)}
        className="flex gap-3 bg-card rounded-2xl p-3 shadow-sm border border-border/50 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="relative flex-shrink-0">
          <img
            src={food.image}
            alt={food.name}
            className="w-20 h-20 object-cover rounded-xl"
          />
          {food.isSale && (
            <span className="absolute top-1 left-1 bg-destructive text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
              SALE
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{food.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{food.restaurant}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              <Star size={11} className="fill-yellow-400 stroke-yellow-400" />
              <span className="text-xs font-medium">{food.rating}</span>
            </div>
            <div className="flex items-center gap-0.5 text-muted-foreground">
              <Clock size={11} />
              <span className="text-xs">{food.prepTime}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-primary font-bold text-sm">{formatPrice(food.price)}</span>
              {food.originalPrice && (
                <span className="text-muted-foreground text-xs line-through ml-1">
                  {formatPrice(food.originalPrice)}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleAdd}
              className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-sm"
            >
              <Plus size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/food/${food.id}`)}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 cursor-pointer hover:shadow-md transition-all duration-200"
    >
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-36 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {food.isPopular && (
            <span className="bg-primary/90 text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">
              Phổ biến
            </span>
          )}
          {food.isSale && (
            <span className="bg-destructive/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              SALE
            </span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleAdd}
          className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus size={16} />
        </motion.button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">{food.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{food.restaurant}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-primary font-bold text-sm">{formatPrice(food.price)}</span>
            {food.originalPrice && (
              <span className="text-muted-foreground text-xs line-through ml-1">
                {formatPrice(food.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-yellow-400 stroke-yellow-400" />
            <span className="text-xs font-medium text-foreground">{food.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          {food.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[9px] py-0 px-1.5 h-4">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
