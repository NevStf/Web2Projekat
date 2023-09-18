import React from "react";
import {  useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Profile from "./admin/profile";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Profile />
    </div>
  );
}

export default AdminDashboard;