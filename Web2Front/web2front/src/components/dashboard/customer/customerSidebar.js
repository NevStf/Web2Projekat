import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Person, CheckCircle, BagCheck } from "react-bootstrap-icons";
import "../admin/adminSidebar"
import { AuthContext } from "../../../context/authContext";
import { House, Cart, Bag } from "react-bootstrap-icons";

function CustomerSidebar() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); // Destructure removeToken from AuthContext

  return (
    <div className="navlink">
      <div>
        <div className="tab">
          <Link to="/customer-dashboard" className="tab-link">
            <House className="tab-icon" />
            <span className="tab-text">Home</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/customer-dashboard/profile" className="tab-link">
            <Person className="tab-icon" />
            <span className="tab-text">Profile</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/customer-dashboard/new-order" className="tab-link">
            <Cart className="tab-icon tab-icon-window" />
            <span className="tab-text">New Order</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/customer-dashboard/my-orders" className="tab-link">
            <Bag className="tab-icon" />
            <span className="tab-text">My Orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerSidebar;
