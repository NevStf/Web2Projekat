import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Person, CheckCircle, BagCheck, DoorOpen } from "react-bootstrap-icons";
import "../admin/adminHeader.css";
import { AuthContext } from "../../../context/authContext";

function AdminHeader(){
    const navigate = useNavigate();
    const { removeToken } = useContext(AuthContext);

    const handleLogout = () => {
        removeToken();
        console.log("token removed");
        navigate("/login");
    };

    return (
        <div className="top-barv2">
         <div>
          <div className="logout-tab ms-auto col-md-3">
           <div className="tab mx-auto" onClick={handleLogout}>
            <DoorOpen className="tab-icon" title="Logout" />
            <span className="tab-text">Logout</span>
           </div>
          </div>
         </div>
        </div>
    );
}


export default AdminHeader;