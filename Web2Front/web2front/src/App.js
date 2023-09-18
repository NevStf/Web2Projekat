import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/reglog/register";
import Login from "./components/reglog/login";
import AdminDashboard from "./components/dashboard/adminDashboard";
import CustomerDashboard from "./components/dashboard/customer/customerDashboard";
import { AuthProvider } from "./context/authContext";
import CustomerProfile from "./components/dashboard/customer/customerProfile";
import CustomerNewOrder from "./components/dashboard/customer/customerNewOrder";
import CustomerMyOrders from "./components/dashboard/customer/customerMyOrders";
import ContextProvider from "./context/contextProvider";
import Profile from "./components/dashboard/admin/profile";
import Orders from "./components/dashboard/admin/orders";
import Verification from "./components/dashboard/admin/verification";
import SellerDashboard from "./components/dashboard/seller/sellerDashboard";
import SellerProfile from "./components/dashboard/seller/sellerProfile";
import SellerProducts from "./components/dashboard/seller/sellerProducts";
import SellerNewProduct from "./components/dashboard/seller/sellerNewProduct";
import UpdateProduct from "./components/dashboard/seller/sellerUpdateProduct";
import SellerOrders from "./components/dashboard/seller/sellerOrders";
import SellersOldOrders from "./components/dashboard/seller/sellerOldOrders";
import useAuth from "./services/useAuth";



function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
      <ContextProvider>
        <Routes>
          {/* auth rute */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* admin rute */}
          <Route
              path="/admin-dashboard"
              // element={<AdminDashboard />}
              element= {<ProtectedRoute Component={AdminDashboard} />}
            />
           <Route
              path="/admin-dashboard/profile"
              // element={<Profile />}
              element={<ProtectedRoute Component={Profile} />}
            />
            <Route
              path="/admin-dashboard/verifications"
              // element={<Verification/>}
             element={<ProtectedRoute Component={Verification} />}
            />
            <Route
              path="/admin-dashboard/orders"
              // element={<Orders />}
             element={<ProtectedRoute Component={Orders} />}
            />

            {/* kupac rute */}
            <Route
              path="/customer-dashboard"
              // element={<CustomerDashboard />}
             element={<ProtectedRoute Component={CustomerDashboard} />}
            />
            <Route
              path="/customer-dashboard/profile"
              // element={<CustomerProfile />}
              element={<ProtectedRoute Component={CustomerProfile} />}
            />
            <Route
              path="/customer-dashboard/new-order"
              // element={<CustomerNewOrder />}
              element={<ProtectedRoute Component={CustomerNewOrder} />}
            />
            <Route
              path="/customer-dashboard/my-orders"
              // element={<CustomerMyOrders />}
              element={<ProtectedRoute Component={CustomerMyOrders} />}
            />
            {/* prodavac rute */}
            <Route
              path="/seller-dashboard"
              // element={<SellerDashboard/>}
              element={<ProtectedRoute Component={SellerDashboard} />}
            />
            <Route
              path="/seller-dashboard/profile"
              // element={<SellerProfile/>}
             element={<ProtectedRoute Component={SellerProfile} />}
            />
            <Route
              path="/seller-dashboard/products"
              // element={<SellerProducts/>}
              element={<ProtectedRoute Component={SellerProducts} />}
            />
            <Route
              path="/seller-dashboard/new-product"
              // element={<SellerNewProduct/>}
              element={<ProtectedRoute Component={SellerNewProduct} />}
            />
            <Route
              path="/seller-dashboard/update-product/:productId"
              // element={<UpdateProduct/>}
              element={<ProtectedRoute Component={UpdateProduct} />}
            />
            <Route
              path="/seller-dashboard/old-orders"
              // element={<SellerOrders/>}
              element={<ProtectedRoute Component={SellerOrders} />}
            />
            <Route
              path="/seller-dashboard/new-orders"
              // element={<SellersOldOrders/>}
              element={<ProtectedRoute Component={SellersOldOrders} />}
            />

        </Routes>
        </ContextProvider>
      </AuthProvider>
      </BrowserRouter>
  );
}

function ProtectedRoute({ Component }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
}

export default App;
