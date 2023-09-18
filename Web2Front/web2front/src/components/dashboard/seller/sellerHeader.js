import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import {SignOut20Filled} from "@fluentui/react-icons";
import "../seller/sellerHeader.css";
import { AuthContext } from "../../../context/authContext";

function SellerHeader() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); 

  const handleLogout = () => {
    removeToken();
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
