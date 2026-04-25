import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";

// Pages
import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import FoodDetailPage from "./pages/FoodDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ReviewsPage from "./pages/ReviewsPage";
import OrdersPage from "./pages/OrdersPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/not-found/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <HashRouter>
        <Routes>
          <Route path={ROUTE_PATHS.SPLASH} element={<SplashPage />} />
          <Route path={ROUTE_PATHS.ONBOARDING} element={<OnboardingPage />} />
          <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
          <Route path={ROUTE_PATHS.MENU} element={<MenuPage />} />
          <Route path={ROUTE_PATHS.FOOD_DETAIL} element={<FoodDetailPage />} />
          <Route path={ROUTE_PATHS.CART} element={<CartPage />} />
          <Route path={ROUTE_PATHS.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTE_PATHS.ORDER_SUCCESS} element={<OrderSuccessPage />} />
          <Route path={ROUTE_PATHS.ORDER_TRACKING} element={<OrderTrackingPage />} />
          <Route path={ROUTE_PATHS.REVIEWS} element={<ReviewsPage />} />
          <Route path={ROUTE_PATHS.ORDERS} element={<OrdersPage />} />
          <Route path={ROUTE_PATHS.SEARCH} element={<SearchPage />} />
          <Route path={ROUTE_PATHS.PROFILE} element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
