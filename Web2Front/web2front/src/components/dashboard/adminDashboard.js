import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./admin/adminHeader";
import AdminSidebar from "./admin/adminSidebar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <AdminHeader />
      <AdminSidebar />
    </div>
  );
}

export default AdminDashboard;