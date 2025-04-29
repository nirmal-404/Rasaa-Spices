import { Route, Routes, useSearchParams } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminEditHero from "./pages/admin-view/customize";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import ContactUs from "./pages/shopping-view/contact";
import AboutUs from "./pages/shopping-view/about";


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const rawToken = sessionStorage.getItem("token");
  
    // Check for null and parse only if valid
    if (rawToken) {
      const token = JSON.parse(rawToken);
      if (token) {
        dispatch(checkAuth(token));
      }
    }
  }, [dispatch]);
  

  
  if (isLoading) {
    return (
      <div className="relative p-4">
        {/* Skeleton Loader */}
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-200 h-[80px] rounded-lg" />
          <div className="bg-gray-200 h-[200px] rounded-lg" />
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-200 h-[150px] rounded-lg" />
            <div className="bg-gray-200 h-[150px] rounded-lg" />
            <div className="bg-gray-200 h-[150px] rounded-lg" />
          </div>
          <div className="bg-gray-200 h-[120px] rounded-lg" />
        </div>
  
        {/* Spinner Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  
  

  // console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="hero" element={<AdminEditHero />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />

      </Routes >
    </div>
  )
}

export default App
