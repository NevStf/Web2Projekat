import React from "react";
import { Link } from "react-router-dom";
import { Person, CheckCircle, BagCheck } from "react-bootstrap-icons";
import "./adminSidebar.css";


function AdminSidebar() {
  return (
    <div className=" navlink">
      <div>
        <div className="tab">
          <Link to="/admin-dashboard/profile" className="tab-link">
            <Person className="tab-icon" />
            <span className="tab-text">Profile</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/admin-dashboard/verifications" className="tab-link">
            <CheckCircle className="tab-icon" />
            <span className="tab-text">Verification</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/admin-dashboard/orders" className="tab-link">
            <BagCheck className="tab-icon" />
            <span className="tab-text">All orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
