import React, { useEffect, useState, useContext, useRef } from "react";
import { Pen } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../context/authContext";
import "./sellerProfile.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SellerSidebar from "./sellerSidebar";
import { Row, Col } from "react-bootstrap";
import {
  Clock16Filled,
  CheckboxChecked16Filled,
  BugFilled,
  ArrowUp16Filled,
} from "@fluentui/react-icons";
import { Dialog, DialogType, Image } from "@fluentui/react";
import { Users, usersUpdate } from "../../../services/userService";
import SellerHeader from "./sellerHeader";
import { userChangePass } from "../../../services/authService";

function SellerProfile() {
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
        console.error("Error:", error);
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

  const [lozinka, setLozinka] = useState("");
  const [novaLozinka, setNovaLozinka] = useState("");
  const [novaPotvrda, setNovaPotvrda] = useState("");
  const handlePassChange = async () =>{
    const formData = {
      lozinka,
      novaLozinka,
      novaPotvrda
    };

    try{
      const response = await userChangePass(token, formData);
      if (response.ok){
        navigate('/login')
      }
      else{
        console.log("Error:");
      }
    }catch(error){
      console.log("Error:", error);
    }

  }

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

    try {
      const response = await usersUpdate(token, formData);

      const data = await response.json();

      if (response.ok) {
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
      <SellerHeader />
      <Row>
        <Col sm={3}>
          <SellerSidebar />
        </Col>
        <Col sm={9}>
          <div className="card documentcardtitle">
            {userProfile ? (
              <div className="pt-5">
                <div className="card-header">
                  <h3 className="card-title"> User Profile</h3>
                  <div className="ms-3 cursor-pointer">
                    <Pen
                      onClick={handleEditClick}
                      className={` ${isEditMode ? "active" : ""}`}
                    />
                  </div>
                </div>
                <div className="card-content">
                  {isEditMode ? (
                    <Form.Group className="stack-card" style={{ gap: "10px" }}>
                      <div>
                        <div className="gray-text">Name:</div>
                        <Form.Control
                          type="text"
                          defaultValue={ime}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Lastname:</div>
                        <Form.Control
                          type="text"
                          defaultValue={prezime}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Username:</div>
                        <Form.Control
                          type="text"
                          defaultValue={kIme}
                          onChange={(event) => setUserName(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Email:</div>
                        <Form.Control
                          type="email"
                          defaultValue={emailAdresa}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">DOB:</div>
                        <Form.Control
                          type="date"
                          className="date-input"
                          value={datumRodjenja}
                          onChange={(event) => setDate(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Address:</div>
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
                    </Form.Group>
                  ) : (
                    <div className="stack" tokens={{ childrenGap: 10 }}>
                        <div className="profile-image">
                    <Image
                      src={slika || "placeholder-image-url"}
                      alt="Profile Image"
                      width={100}
                      height={100}
                    />
                  </div>
                      <div className="gray-text">Name: {ime}</div>
                      <div className="gray-text">Lastname: {prezime}</div>
                      <div className="gray-text">Username: {kIme}</div>
                      <div className="gray-text">Email: {emailAdresa}</div>
                      <div className="gray-text">DOB: {datumRodjenja}</div>
                      <div className="gray-text">Address: {adresa}</div>
                      <div className="gray-text">
                        <span className="gray-text">
                          {tip === 2
                            ? "Role : admin"
                            : tip === 1
                            ? "Role : prodavac"
                            : "Role : kupac"}
                        </span>
                      </div>
                      <div className="gray-text">
                        Status:
                        {status == 0 ? (
                          <Clock16Filled className="pending-icon" />
                        ) : status == 1 ? (
                          <CheckboxChecked16Filled className="accepted-icon" />
                        ) : status == -1 ? (
                          <BugFilled className="rejected-icon" />
                        ) : null}
                      </div>

                      <hr></hr>
                      <h3>Change password</h3>
                      <Form className="stack" style={{ gap: "10px" }}>
                    <div>
                        <Form.Label className="gray-text">Old Password:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={lozinka}
                          onChange={(event) => setLozinka(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">New Password:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={novaLozinka}
                          onChange={(event) => setNovaLozinka(event.target.value)}
                        />
                      </div>
                      <div>
                        <Form.Label className="gray-text">Confirm New Password:</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={novaPotvrda}
                          onChange={(event) => setNovaPotvrda(event.target.value)}
                        />
                      </div>

                    </Form>
                    <Button
                      className="primary-button"
                      onClick={handlePassChange}
                      styles={{ root: { marginBottom: "20px" } }} 
                    >
                      Save
                    </Button>
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <div className="submit-button-container">
                    <Button
                      onClick={handleSubmit}
                      styles={{ root: { marginBottom: "20px" } }} 
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

export default SellerProfile;
