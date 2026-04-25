import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Clock, TrendingUp, ArrowLeft } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { FoodCard } from '@/components/FoodCard';
import { FOOD_ITEMS } from '@/data/mockData';
import { ROUTE_PATHS } from '@/lib/index';

const TRENDING = ['Bún bò Huế', 'Cơm tấm sườn', 'Phở bò', 'Trà sữa trân châu', 'Burger phô mai'];
const HISTORY = ['Bún bò đặc biệt', 'Cơm gà xối mỡ'];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = query.trim()
    ? FOOD_ITEMS.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.restaurant.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 border-b border-border/50 px-4 pt-12 pb-3"
        style={{ backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
            <ArrowLeft size={18} />
          </motion.button>
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              placeholder="Tìm món ăn, quán ăn..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-muted/60 rounded-xl pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        {!query ? (
          <>
            {/* Search history */}
            {HISTORY.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="font-bold text-sm flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    Tìm kiếm gần đây
                  </p>
                  <button className="text-primary text-xs font-medium">Xóa tất cả</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {HISTORY.map((h) => (
                    <motion.button
                      key={h}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setQuery(h)}
                      className="flex items-center gap-1.5 bg-muted/60 rounded-xl px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Clock size={11} className="text-muted-foreground" />
                      {h}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <p className="font-bold text-sm flex items-center gap-2 mb-2.5">
                <TrendingUp size={14} className="text-primary" />
                Đang thịnh hành
              </p>
              <div className="space-y-0">
                {TRENDING.map((t, i) => (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuery(t)}
                    className="w-full flex items-center gap-3 py-2.5 text-left hover:bg-muted/40 rounded-xl px-2 transition-colors"
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i === 0 ? 'bg-red-100 text-red-600' :
                      i === 1 ? 'bg-orange-100 text-orange-600' :
                      i === 2 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground flex-1">{t}</span>
                    <TrendingUp size={13} className="text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </div>
          </>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">🔍</span>
            <p className="font-bold text-lg">Không tìm thấy kết quả</p>
            <p className="text-muted-foreground text-sm mt-1">
              Thử tìm với từ khóa khác như "bún", "cơm", "trà sữa"...
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              <span className="font-semibold text-foreground">{results.length}</span> kết quả cho "<span className="text-primary">{query}</span>"
            </p>
            <div className="space-y-3">
              {results.map((food, i) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FoodCard food={food} variant="horizontal" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav activePath={ROUTE_PATHS.SEARCH} />
    </div>
  );
}
