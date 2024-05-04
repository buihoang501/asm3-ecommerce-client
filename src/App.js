//Import from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import components
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as productListLoader } from "./pages/HomePage";

import ShopPage from "./pages/ShopPage";
import DetailPage, { loader as productDetailLoader } from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckOutPage, {
  loader as currenUserLoader,
  action as CreateOrder,
} from "./pages/CheckOutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { action as authAction } from "./components/AuthForm";
import { action as logoutAction } from "./pages/Logout";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";
import OrdersPage, { loader as ordersLoader } from "./pages/OrdersPage";
import OrderDetailPage, {
  loader as orderDetailLoader,
} from "./pages/OrderDetailPage";

//Defines  routes via  createBrowerRouter func
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "products",
    loader: productListLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: productDetailLoader,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOutPage />
          </ProtectedRoutes>
        ),
        loader: currenUserLoader,
        action: CreateOrder,
      },
      {
        path: "orders",
        element: (
          <ProtectedRoutes>
            <OrdersPage />
          </ProtectedRoutes>
        ),

        loader: ordersLoader,
      },
      {
        path: "orders/:orderId",
        element: (
          <ProtectedRoutes>
            <OrderDetailPage />
          </ProtectedRoutes>
        ),
        loader: orderDetailLoader,
      },

      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <LoginPage />
          </ProtectedAuthRoute>
        ),
        action: authAction,
      },

      {
        path: "signup",
        element: (
          <ProtectedAuthRoute>
            <RegisterPage />
          </ProtectedAuthRoute>
        ),
        action: authAction,
      },
      {
        path: "/logout",
        element: null,
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  //Render Router Component Tree
  return <RouterProvider router={router} />;
}

export default App;
