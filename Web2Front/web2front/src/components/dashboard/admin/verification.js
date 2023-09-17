import React, { useEffect, useState, useContext } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  Image,
  Dialog,
  DialogType,
  DialogFooter,
  Text,
} from "@fluentui/react";
import { AuthContext } from "../../../context/authContext";
import { Button, Row, Col } from "react-bootstrap";
import AdminHeader from "./adminHeader";
import "./verification.css";
import { useNavigate } from "react-router-dom";
import { getAllSellers, usersVerify } from "../../../services/userService";
import AdminSidebar from "./adminSidebar";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

function Verification() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState(""); // Stores the selected dialog action: "accept" or "decline"
  const navigate = useNavigate();

  useEffect(() => {


    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await getAllSellers(token);
      const data = await response.json();
      console.log(data.users)
      if (response.ok) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerify = (user) => {
    setSelectedUser(user);
    setIsDialogVisible(true);
  };

  const handleConfirm = (action, user) => {
    setSelectedUser(user);
    setDialogAction(action);
    setIsDialogVisible(true);
  };

  const handleAction = async () => {
    const status = dialogAction === "accept" ? 1 : -1;
    const headers = {
      "Content-Type": "application/json",
      Token: token,
    };

    try {
      const response = await usersVerify(selectedUser, status, headers);

      if (response.ok) {
        console.log(
          `User ${dialogAction === "accept" ? "accepted" : "declined"}:`,
          selectedUser
        );
        setUsers([]) // Reload the page
        fetchData()
      } else {
        console.log(
          `Error ${
            dialogAction === "accept" ? "accepting" : "declining"
          } user:`,
          response.status
        );
      }
    } catch (error) {
      console.log(
        `Error ${dialogAction === "accept" ? "accepting" : "declining"} user:`,
        error
      );
    }

    setIsDialogVisible(false);
  };

  return (
    <div className="container">
      <AdminHeader />
      <Row>
        <Col sm={3}>
          <AdminSidebar />
        </Col>
        <Col sm={9}>
          <div className="card-container">
            {users.map((user) => (
              <DocumentCard key={user.kIme} className="user-card document-card">
                <div className="user-info">
                  <Image
                    src={user.slika || "placeholder-image-url"}
                    alt="User Image"
                    width={130}
                    height={120}
                  />
                  <div className="user-details">
                    <h3>{user.kIme}</h3>
                    <div className="document-card-div">
                      <span>Email: {user.emailAdresa}</span>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <Button
                    onClick={() => handleConfirm("accept", user)}
                    className="accept-button"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleConfirm("decline", user)}
                    className="reject-button"
                  >
                    Decline{" "}
                  </Button>
                    {user.status==1 ? <CheckCircle className="icon-yay"/> : (user.status==0 ? <></> : <XCircle className="icon-nay" />) }
                </div>
              </DocumentCard>
            ))}
          </div>
        </Col>
      </Row>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Verification",
          subText: `Are you sure you want to ${
            dialogAction === "accept" ? "accept" : "decline"
          } ${selectedUser?.kIme}?`,
        }}
      >
        <DialogFooter>
          <Button
            onClick={handleAction}
            className={
              dialogAction === "accept" ? "accept-button" : "reject-button"
            }
          >
            {dialogAction === "accept" ? "Accept" : "Decline"}{" "}
          </Button>
          <Button text="" onClick={() => setIsDialogVisible(false)}>
            {" "}
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Verification;
