import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Camera, ThumbsUp, Send } from 'lucide-react';
import { SAMPLE_REVIEWS, FOOD_ITEMS } from '@/data/mockData';
import { ROUTE_PATHS } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const QUICK_TAGS = [
  'Ngon lắm!', 'Giao nhanh', 'Đóng gói đẹp',
  'Phần ăn nhiều', 'Giá hợp lý', 'Sẽ đặt lại',
  'Nước dùng thơm', 'Tươi ngon',
];

export default function ReviewsPage() {
  const navigate = useNavigate();
  const [foodRating, setFoodRating] = useState(0);
  const [shipperRating, setShipperRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const food = FOOD_ITEMS[0];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (foodRating === 0) {
      toast.error('Vui lòng đánh giá món ăn!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate(ROUTE_PATHS.HOME), 2200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen max-w-sm mx-auto bg-background flex flex-col items-center justify-center gap-5 px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          🙏
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-extrabold text-foreground">Cảm ơn bạn!</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Đánh giá của bạn giúp chúng tôi cải thiện dịch vụ mỗi ngày. 💪
          </p>
          <p className="text-primary font-bold mt-2 text-sm">+50 điểm tích lũy đã được cộng!</p>
        </motion.div>
      </div>
    );
  }

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
          <h1 className="font-bold text-lg">Đánh giá đơn hàng</h1>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Food card */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 flex gap-3 items-center">
          <img src={food.image} alt={food.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">{food.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{food.restaurant}</p>
          </div>
        </div>

        {/* Food Rating */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="font-bold text-sm mb-1">Chất lượng món ăn</p>
          <p className="text-xs text-muted-foreground mb-3">Bạn cảm thấy thế nào về món này?</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.85 }}
                onClick={() => setFoodRating(star)}
              >
                <Star
                  size={36}
                  className={cn(
                    'transition-all duration-150',
                    star <= foodRating
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'fill-none stroke-muted-foreground'
                  )}
                />
              </motion.button>
            ))}
            {foodRating > 0 && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-bold text-yellow-500 ml-2"
              >
                {['', 'Tệ', 'Không tốt', 'Bình thường', 'Khá tốt', 'Tuyệt vời!'][foodRating]}
              </motion.span>
            )}
          </div>
        </div>

        {/* Shipper Rating */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <div className="flex items-center gap-3 mb-3">
            <img src="https://ui-avatars.com/api/?name=Minh+Tu&background=27AE60&color=fff&size=36"
              alt="Shipper" className="w-10 h-10 rounded-2xl" />
            <div>
              <p className="font-bold text-sm">Đánh giá shipper</p>
              <p className="text-xs text-muted-foreground">Minh Tú • 🛵</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button key={star} whileTap={{ scale: 0.85 }} onClick={() => setShipperRating(star)}>
                <Star size={28}
                  className={cn('transition-all', star <= shipperRating ? 'fill-yellow-400 stroke-yellow-400' : 'fill-none stroke-muted-foreground')}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick tags */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="font-bold text-sm mb-3">Chọn tag nhanh</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <motion.button
                key={tag}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleTagToggle(tag)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                  selectedTags.includes(tag)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-muted border-transparent text-muted-foreground hover:border-border'
                )}
              >
                {selectedTags.includes(tag) ? '✓ ' : ''}{tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="font-bold text-sm mb-2">Viết nhận xét</p>
          <textarea
            placeholder="Chia sẻ trải nghiệm của bạn... Đây là bún bò ngon nhất tôi từng ăn! 😍"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-muted/40 rounded-xl px-3 py-2.5 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-primary border border-border placeholder:text-muted-foreground/60"
          />
          <div className="flex items-center justify-between mt-2">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Camera size={14} />
              Thêm ảnh
            </button>
            <span className="text-xs text-muted-foreground">{comment.length}/300</span>
          </div>
        </div>

        {/* Reviews from others */}
        <div>
          <p className="font-bold text-sm mb-3">Đánh giá từ sinh viên UTH</p>
          <div className="space-y-3">
            {SAMPLE_REVIEWS.map((rv) => (
              <div key={rv.id} className="bg-card rounded-2xl border border-border/50 p-4">
                <div className="flex items-start gap-3">
                  <img src={rv.avatar} alt={rv.userName} className="w-10 h-10 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{rv.userName}</p>
                      <span className="text-xs text-muted-foreground">{rv.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11}
                          className={i < rv.rating ? 'fill-yellow-400 stroke-yellow-400' : 'fill-none stroke-muted-foreground'} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 mt-1.5 leading-relaxed">{rv.comment}</p>
                    <button className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp size={12} />
                      Hữu ích ({rv.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/95 border-t border-border p-4"
        style={{ backdropFilter: 'blur(12px)' }}>
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleSubmit}
            className="w-full h-13 text-base font-bold rounded-2xl bg-primary text-primary-foreground"
            style={{ height: 52, boxShadow: '0 8px 24px oklch(0.65 0.18 35 / 35%)' }}
          >
            <Send size={16} className="mr-2" />
            Gửi đánh giá · +50 điểm 🌟
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
