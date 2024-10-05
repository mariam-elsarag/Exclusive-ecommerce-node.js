import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SignIn = lazy(() => import("./features/auth/SignIn"));
const SignUp = lazy(() => import("./features/auth/SignUp"));
const Account = lazy(() => import("./features/account/Account"));
const Products = lazy(() => import("./features/product/Products"));
const ProductDetails = lazy(() => import("./features/product/ProductDetails"));
const Cart = lazy(() => import("./features/cart/Cart"));
const Checkout = lazy(() => import("./features/checkout/Checkout"));
const WishList = lazy(() => import("./features/whishlist/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound"));
import SpinnerFullPage from "./ui/SpinnerFullPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ui/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route
                path="account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="product" element={<Products />}>
                <Route path=":productId" element={<ProductDetails />} />
              </Route>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="wisthlist" element={<WishList />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  );
};

export default App;
