import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect non-authenticated users trying to access restricted pages
  if (
    !isAuthenticated &&
    ![
      "/shop/home",
      "/listing",
      "/search",
      "/contact",
      "/about"
    ].some(path => location.pathname.includes(path))
  ) {
    return <Navigate to="/shop/home" />;
  }

  // Redirect users who try to access "/"
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/shop/home" />;
    }
    return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
  }

  // Prevent normal users from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Prevent admin users from accessing shop routes
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Ensure no one can access specific routes without logging in
  if (
    !isAuthenticated &&
    [
      "/shop/account",
      "/shop/checkout",
      "/shop/paypal-return",
      "/shop/payment-success",
    ].includes(location.pathname)
  ) {
    return <Navigate to="/shop/home" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
