import React from "react";
import { Text } from "@fluentui/react";
import SellerSidebar from "./sellerSidebar";
import AdminHeader from "../admin/adminHeader";
import { Row, Col, Container } from "react-bootstrap";
//import Map from "../../Map";
import { useState } from "react";
import SellerHeader from "./sellerHeader";
import SellerProfile from "./sellerProfile";

const SellerDashboard = () => {

  return (
    <div className="container">
      <SellerProfile />
    </div>
  );
};

export default SellerDashboard;
