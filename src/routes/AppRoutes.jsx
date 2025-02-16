import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Layout from "../layouts/Layout";
import MianManage from "../pages/store/MianManage";
import LayoutUser from "../layouts/LayoutUser";
import LayoutStore from "../layouts/LayoutStore";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DashboardStore from "../pages/store/DashboardStore";
import Product from "../pages/Product";
import OrderOut from "../pages/OrderOut";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import ProductManage from "../pages/store/ProductManage";
import EditProductManage from "../pages/store/EditProductManage";
import AddProductManage from "../pages/store/AddProductManage";
import OrdersManage from "../pages/store/OrdersManage";
import ProductRental from "../pages/store/ProductRental";
import MyAccount from "../pages/user/MyAccount";
import HomeUser from "../pages/user/HomeUser";
import Payment from "../pages/user/payment";
import Register from "../pages/auth/Register";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import CategoryAdmin from "../pages/admin/CategoryAdmin";
import LogManage from "../pages/admin/LogManage";    
import History from "../pages/user/History";



const router = createBrowserRouter([
  {
     /* user not login */ 
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "category", element: <Category /> },
      { path: "product/:productId", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register" , element: <Register/>},
      { path: "privacypolicy" ,element: <PrivacyPolicy />},
      { path: "termsconditions",element: <TermsConditions />},
      { path: "checkout", element: <Checkout /> },
     
     
    ],
  },
  /* Admin */ 
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutStore />} />,
    children: [
      { index: true, element: <MianManage /> },
      { path: "dashboar-manage", element: <DashboardStore /> },
      { path: "product-manage", element: <ProductManage /> },
      { path: "product-manage/edit-product-manage/:id", element: <EditProductManage /> },
      { path: "product-manage/add-product-manage", element: <AddProductManage/> },
      { path: "orders" , element: <OrdersManage/>},
      { path: "product-rental" , element: <ProductRental/>},
      { path: "category-admin" , element: <CategoryAdmin />},
      { path: "log-manage" , element: <LogManage/>},
      
    ],
  },
  

    /* user */ 
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser/> },
      { path: "order", element: <OrderOut /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "history" , element: <History/>},
      { path: "payment", element: <Payment /> },

      
      
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
    
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
