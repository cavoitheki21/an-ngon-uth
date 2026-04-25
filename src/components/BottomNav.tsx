import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Home, Search, ClipboardList, User, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Home, label: 'Trang chủ', path: ROUTE_PATHS.HOME },
  { icon: Search, label: 'Tìm kiếm', path: ROUTE_PATHS.SEARCH },
  { icon: ShoppingCart, label: 'Giỏ hàng', path: ROUTE_PATHS.CART },
  { icon: ClipboardList, label: 'Đơn hàng', path: ROUTE_PATHS.ORDERS },
  { icon: User, label: 'Tôi', path: ROUTE_PATHS.PROFILE },
];

interface BottomNavProps {
  activePath?: string;
}

export function BottomNav({ activePath = '/' }: BottomNavProps) {
  const navigate = useNavigate();
  const totalItems = useCart((s) => s.getTotalItems());

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/95 border-t border-border z-50"
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const isActive = activePath === path;
          const isCart = path === ROUTE_PATHS.CART;
          return (
            <motion.button
              key={path}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon size={22} className={cn(isActive && 'stroke-[2.5px]')} />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-destructive text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className={cn('text-[10px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
