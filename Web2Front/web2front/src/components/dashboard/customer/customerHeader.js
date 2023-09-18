import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import {  DoorOpen } from "react-bootstrap-icons";
import "./customerHeader.css";
import { AuthContext } from "../../../context/authContext";

function CustomerHeader() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); 

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <div
        horizontal
        tokens={{ childrenGap: 10 }}
        className="tab-group topbar-style"
      >
        <div className="logout-tab">
          <div className="tab" onClick={handleLogout}>
            <DoorOpen className="tab-icon" title="Logout" ariaLabel="Logout" />
            <span className="tab-text">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHeader;
