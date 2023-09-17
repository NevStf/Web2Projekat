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
              element={<AdminDashboard />}
              // element= {<ProtectedRoute Component={AdminDashboard} />}
            />
           <Route
              path="/admin-dashboard/profile"
              element={<Profile />}
              //element={<ProtectedRoute Component={Profile} />}
            />
            <Route
              path="/admin-dashboard/verifications"
              element={<Verification/>}
             // element={<ProtectedRoute Component={VerificationPage} />}
            />
            <Route
              path="/admin-dashboard/orders"
              element={<Orders />}
             // element={<ProtectedRoute Component={OrdersPage} />}
            />

            {/* kupac rute */}
            <Route
              path="/customer-dashboard"
              element={<CustomerDashboard />}
             // element={<ProtectedRoute Component={CustomerDashboard} />}
            />
            <Route
              path="/customer-dashboard/profile"
              element={<CustomerProfile />}
              // element={<ProtectedRoute Component={CustomerProfile} />}
            />
            <Route
              path="/customer-dashboard/new-order"
              element={<CustomerNewOrder />}
              //element={<ProtectedRoute Component={CustomerNewOrder} />}
            />
            <Route
              path="/customer-dashboard/my-orders"
              element={<CustomerMyOrders />}
              //element={<ProtectedRoute Component={CustomerMyOrders} />}
            />
            {/* prodavac rute */}
        </Routes>
        </ContextProvider>
      </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
