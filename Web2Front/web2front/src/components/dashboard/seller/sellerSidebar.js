import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Person, CheckCircle, BagCheck } from "react-bootstrap-icons";
import "../admin/adminSidebar";
import { AuthContext } from "../../../context/authContext";
import { House, Cart, Bag } from "react-bootstrap-icons";
import {
  ArrowForwardDownPerson20Filled,
  WindowNew16Filled,
  ShoppingBag16Filled,
  BuildingShop16Filled,
} from "@fluentui/react-icons";


function SellerSidebar() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); // Destructure removeToken from AuthContext

  return (
    <div className=" navlink">
      <div>
        <div className="tab">
          <Link to="/seller-dashboard/profile" className="tab-link">
            <ArrowForwardDownPerson20Filled className="tab-icon" />
            <span className="tab-text">Profile</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/seller-dashboard/products" className="tab-link">
            <WindowNew16Filled className="tab-icon tab-icon-window" />
            <span className="tab-text">Add item</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/seller-dashboard/new-orders" className="tab-link">
            <ShoppingBag16Filled className="tab-icon" />
            <span className="tab-text">New Order</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/seller-dashboard/old-orders" className="tab-link">
            <BuildingShop16Filled className="tab-icon" />
            <span className="tab-text">My orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellerSidebar;
