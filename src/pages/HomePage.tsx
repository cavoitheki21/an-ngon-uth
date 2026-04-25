import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Search, ChevronRight, MapPin, Star, Clock, Flame, Gift } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { FoodCard } from '@/components/FoodCard';
import { FOOD_ITEMS, CATEGORIES, RESTAURANTS, BANNERS } from '@/data/mockData';
import { ROUTE_PATHS } from '@/lib/index';
import { Badge } from '@/components/ui/badge';

const POPULAR_FOODS = FOOD_ITEMS.filter((f) => f.isPopular);
const SALE_FOODS = FOOD_ITEMS.filter((f) => f.isSale);

export default function HomePage() {
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-background pb-24 overflow-x-hidden">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, oklch(0.65 0.18 35) 0%, oklch(0.72 0.16 45) 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
        <div className="absolute top-2 right-4 w-12 h-12 bg-white/10 rounded-full" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <MapPin size={12} />
              <span>Giao đến</span>
            </div>
            <p className="text-white font-bold text-sm mt-0.5">KTX UTH, Phòng B401 📍</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <Bell size={17} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white/0" />
            </motion.button>
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white/30">
              <img src="https://ui-avatars.com/api/?name=Nguyen+Van+Minh&background=FF6B35&color=fff&size=36" alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <p className="text-white/90 text-base font-medium">Xin chào, Minh! 👋</p>
        <p className="text-white font-bold text-xl">Hôm nay ăn gì?</p>

        {/* Search bar */}
        <motion.div
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate(ROUTE_PATHS.SEARCH)}
          className="mt-4 bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg cursor-pointer"
        >
          <Search size={18} className="text-muted-foreground" />
          <span className="text-muted-foreground text-sm flex-1">Tìm món ăn, quán ăn...</span>
          <span className="text-[11px] bg-muted px-2 py-0.5 rounded-lg text-muted-foreground">🔍</span>
        </motion.div>
      </div>

      <div className="px-5">
        {/* Banners / Promotions */}
        <div className="mt-5">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {BANNERS.map((banner, i) => (
              <motion.div
                key={banner.id}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 w-72 h-24 rounded-2xl bg-gradient-to-r ${banner.bgColor} p-4 flex items-center justify-between cursor-pointer shadow-sm`}
              >
                <div>
                  <p className="text-white font-bold text-sm">{banner.title}</p>
                  <p className="text-white/80 text-xs mt-0.5">{banner.subtitle}</p>
                </div>
                <span className="text-4xl">{banner.emoji}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-foreground">Danh mục</h2>
            <button
              onClick={() => navigate(ROUTE_PATHS.MENU)}
              className="text-primary text-xs font-semibold flex items-center gap-0.5"
            >
              Xem tất cả <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.93 }}
                onClick={() => navigate(`${ROUTE_PATHS.MENU}?category=${cat.id}`)}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-2xl"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {cat.icon}
                </div>
                <span className="text-[10px] font-medium text-foreground/80 text-center leading-tight">
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Flash Sale */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <h2 className="font-bold text-base text-foreground">Flash Sale</h2>
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 animate-pulse">
                HOT
              </Badge>
            </div>
            <div className="flex items-center gap-1 bg-destructive/10 px-2.5 py-1 rounded-lg">
              <Clock size={11} className="text-destructive" />
              <span className="text-destructive text-xs font-bold">11:45:22</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {SALE_FOODS.map((food) => (
              <div key={food.id} className="flex-shrink-0 w-40">
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Foods */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-primary" />
              <h2 className="font-bold text-base text-foreground">Món phổ biến</h2>
            </div>
            <button
              onClick={() => navigate(ROUTE_PATHS.MENU)}
              className="text-primary text-xs font-semibold flex items-center gap-0.5"
            >
              Xem thêm <ChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-3">
            {POPULAR_FOODS.map((food) => (
              <FoodCard key={food.id} food={food} variant="horizontal" />
            ))}
          </div>
        </div>

        {/* Nearby Restaurants */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              <h2 className="font-bold text-base text-foreground">Quán gần bạn</h2>
            </div>
            <button className="text-primary text-xs font-semibold flex items-center gap-0.5">
              Bản đồ <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {RESTAURANTS.map((r) => (
              <motion.div
                key={r.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`${ROUTE_PATHS.MENU}?restaurant=${r.id}`)}
                className="flex-shrink-0 w-52 bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 cursor-pointer"
              >
                <div className="relative">
                  <img src={r.image} alt={r.name} className="w-full h-28 object-cover" />
                  {r.isPartner && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">
                      ĐỐI TÁC
                    </span>
                  )}
                  {r.deliveryFee === 0 && (
                    <span className="absolute top-2 right-2 bg-chart-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      FREESHIP
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-foreground truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{r.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="fill-yellow-400 stroke-yellow-400" />
                      <span className="text-xs font-medium">{r.rating}</span>
                      <span className="text-xs text-muted-foreground">({r.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={11} />
                      <span className="text-xs">{r.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Voucher Banner */}
        <div className="mt-6">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-primary to-accent rounded-2xl p-4 flex items-center gap-4 shadow-md cursor-pointer"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Gift size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Bạn có 3 voucher chưa dùng!</p>
              <p className="text-white/80 text-xs mt-0.5">Giảm đến 40K cho đơn tiếp theo</p>
            </div>
            <ChevronRight size={18} className="text-white/70" />
          </motion.div>
        </div>

        {/* All foods */}
        <div className="mt-6 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-foreground">Tất cả món ăn</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {FOOD_ITEMS.slice(0, 6).map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav activePath={ROUTE_PATHS.HOME} />
    </div>
  );
}
