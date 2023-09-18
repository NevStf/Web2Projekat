import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Text } from "@fluentui/react";
import {
  ArrowForwardDownPerson20Filled,
  ShoppingBag16Filled,
  BuildingShop16Filled,
  SignOut20Filled,
  WindowNew16Filled,
} from "@fluentui/react-icons";
import "../seller/sellerHeader.css";
import { AuthContext } from "../../../context/authContext";

function SellerHeader() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); // Destructure removeToken from AuthContext

  const handleLogout = () => {
    // Remove the token from local storage and AuthContext
    removeToken();
    console.log("Token removed"); // Debug line
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <div horizontal tokens={{ childrenGap: 10 }} className="stack tab-group">
        <div className="logout-tab">
          <div className="tab" onClick={handleLogout}>
            <SignOut20Filled className="tab-icon" title="Odjava" />
            <span className="tab-text">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerHeader;
