import React, { useEffect, useState, useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Dialog, DialogType, Image } from "@fluentui/react";
import Form from "react-bootstrap/Form";
import { Pen } from "react-bootstrap-icons";
import { AuthContext } from "../../../context/authContext";
import CustomerHeader from "./customerHeader";
import AdminHeader from "../admin/adminHeader";
import "./customerProfile.css";
import { useNavigate } from "react-router-dom";
import { usersUpdate, Users } from "../../../services/userService";
import CustomerSidebar from "./customerSidebar";
import { Row, Col, Container } from "react-bootstrap";
import { ArrowUp16Filled } from "@fluentui/react-icons";

function CustomerProfile() {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [ime, setFirstName] = useState("");
  const [prezime, setLastName] = useState("");
  const [kIme, setUserName] = useState("");
  const [emailAdresa, setEmail] = useState("");
  const [adresa, setAddress] = useState("");
  const [slika, setImgPath] = useState("");
  const [datumRodjenja, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Users(token);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setUserData(data.user);
          setFirstName(data.user.ime);
          setLastName(data.user.prezime);
          setUserName(data.user.kIme);
          setEmail(data.user.emailAdresa);
          setDate(data.user.datumRodjenja.split("T")[0]);
          setAddress(data.user.adresa);
          setImgPath(data.user.slika);
        }
      } catch (error) {
        console.error( error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]); 

  const {  tip, status, ...userProfile } = userData || {};

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
        setImgPath(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async () => {
    
    const formData = {
      ime,
      prezime,
      kIme,
      datumRodjenja: new Date(datumRodjenja).toISOString(),
      tip,
      adresa,
      slika,
      emailAdresa,
      lozinka: "",
      potvrdaLozinka: "",
      status,
    };

    console.log(formData);

    try {
      const response = await usersUpdate(token, formData);

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully:", data);
        setUserData(formData);
        setIsEditMode(false);
      } else if (response.status === 400) {
        setIsDialogVisible(true);
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <CustomerHeader />
      <Row>
        <Col md={3}>
          <CustomerSidebar />
        </Col>
        <Col md={9}>
          <div className="card documentcardtitle">
            {userProfile ? (
              <div className="">
                <div>
                  <h3 className="card-title py-4 text-center">User Profile</h3>
                  <div
                    onClick={handleEditClick}
                    className="ms-3 mx-auto d-block cursor-pointer"
                  >
                    <span className="pe-2">Edit profile </span>
                    <Pen className={` ${isEditMode ? "active" : ""}`} />
                  </div>
                </div>
                <div className="pt-5">
                  {isEditMode ? (
                    <Form className="stack" style={{ gap: "10px" }}>
                      <div>
                        <Form.Label className="gray-text">Name:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={ime}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">Lastname:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={prezime}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">Username:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={kIme}
                          onChange={(event) => setUserName(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">Email:</Form.Label>
                        <Form.Control
                          type="email"
                          defaultValue={emailAdresa}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">DOB:</Form.Label>
                        <Form.Control
                          type="date"
                          className="date-input"
                          value={datumRodjenja}
                          onChange={(event) => setDate(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">Address:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={adresa}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                      <Form.Group>
                        <Form.Label>Choose Image</Form.Label>
                        <div className="upload-label">
                            <div className="upload-icon">
                            <ArrowUp16Filled />
                            </div>
                            <Form.Control
                            type="text"
                            value={selectedFile ? fileInputRef.current.files[0].name : "Choose Image"}
                            readOnly
                            />
                        </div>
                        <Form.Control
                            type="file"
                            id="productImageInput"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </Form.Group>
                    </Form>
                  ) : (
                    <div className="stack" tokens={{ childrenGap: 20 }}>
                        <div className="profile-image">
                    <Image
                      src={slika || "placeholder-image-url"}
                      alt="Profile Image"
                      width={100}
                      height={100}
                    />
                  </div>
                      <div className="gray-text py-2">
                        Name: <span className="font-bold">{ime}</span>
                      </div>
                      <div className="gray-text py-2">Lastname: {prezime}</div>
                      <div className="gray-text py-2">
                        Korisničko ime: {kIme}
                      </div>
                      <div className="gray-text py-2">Email: {emailAdresa}</div>
                      <div className="gray-text py-2">DOB: {datumRodjenja}</div>
                      <div className="gray-text py-2">Address: {adresa}</div>
                      <div className="gray-text py-2">
                        <div className="gray-text">
                          {tip === 2
                            ? "Role : Admin"
                            : tip === 1
                            ? "Role : Seller"
                            : "Role : Customer"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <div className="submit-button-container">
                    <Button
                      className="primary-button"
                      onClick={handleSubmit}
                      styles={{ root: { marginBottom: "20px" } }} // Apply margin-bottom directly to the button
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="loading-text">Loading...</div>
            )}
          </div>
        </Col>
      </Row>

      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Error",
          subText: "Email is already taken.",
        }}
      />
    </div>
  );
}

export default CustomerProfile;
