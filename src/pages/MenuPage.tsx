import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal, Search, Grid3X3, List } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { FoodCard } from '@/components/FoodCard';
import { FOOD_ITEMS, CATEGORIES } from '@/data/mockData';
import { ROUTE_PATHS } from '@/lib/index';
import { cn } from '@/lib/utils';

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = activeCategory === 'all'
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((f) => f.categoryId === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 border-b border-border/50 px-4 pt-12 pb-3"
        style={{ backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.button>
            <h1 className="font-bold text-lg">Thực đơn</h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
              {viewMode === 'grid' ? <List size={16} /> : <Grid3X3 size={16} />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
              <SlidersHorizontal size={16} />
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <motion.div
          onClick={() => navigate(ROUTE_PATHS.SEARCH)}
          className="bg-muted/60 rounded-xl px-4 py-2.5 flex items-center gap-2 cursor-pointer mb-3"
        >
          <Search size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Tìm món ăn...</span>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'flex-shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all',
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            Tất cả ({FOOD_ITEMS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex-shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{sorted.length}</span> món ăn
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-border rounded-lg px-2.5 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="popular">Phổ biến nhất</option>
            <option value="rating">Đánh giá cao</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>

        {/* Food grid/list */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {sorted.map((food, i) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <FoodCard food={food} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((food, i) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <FoodCard food={food} variant="horizontal" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav activePath={ROUTE_PATHS.MENU} />
    </div>
  );
}
