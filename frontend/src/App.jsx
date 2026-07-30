import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AddProduct from "./components/Addproduct";
import EditProduct from "./components/Editproduct";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/addproduct",
    element: (
      <>
        <Navbar />
        <AddProduct />
      </>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <>
        <Navbar />
        <EditProduct />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
  {
    path: "/orders",
    element: (
      <>
        <Navbar />
        <Orders />
      </>
    ),
  },
]);

function App() {
  return (
     <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;