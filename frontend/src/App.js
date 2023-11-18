import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home, { loader as foodDataLoader } from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import CartProvider from "./context/CartProvider";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Cart from "./components/Cart";
const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: foodDataLoader },
  { path: "/login", element: <Login />, action: loginAction },
  { path: "/signup", element: <Signup />, action: signupAction },
  { path: "/cart", element: <Cart /> },
]);
function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
