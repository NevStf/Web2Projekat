import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";

import {  DoorOpen } from "react-bootstrap-icons";
import "../admin/adminHeader.css";
import { AuthContext } from "../../../context/authContext";

function AdminHeader(){
    const navigate = useNavigate();
    const { removeToken } = useContext(AuthContext);

    const handleLogout = () => {
        removeToken();
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