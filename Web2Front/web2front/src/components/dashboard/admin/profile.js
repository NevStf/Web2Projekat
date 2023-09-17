import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogType } from "@fluentui/react";
import { Pen } from "react-bootstrap-icons";
import { AuthContext } from "../../../context/authContext";
import AdminHeader from "./adminHeader";
import "./profile.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Users, usersUpdate } from "../../../services/userService";
import AdminSidebar from "./adminSidebar";
import { Row, Col } from "react-bootstrap";
import { ImageEditFilled } from "@fluentui/react-icons";

function Profile() {
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

  const { tip, ...userProfile } = userData || {};

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform file upload logic
  };

  const handleSubmit = async () => {
    console.log(adresa);
    const formData = {
      ime,
      prezime,
      kIme,
      datumRodjenja: new Date(datumRodjenja).toISOString(), // Convert the date to ISO format for sending to the backend
      tip,
      adresa,
      slika,
      emailAdresa,
      lozinka: "",
      potvrdaLozinka: "",
    };

    try {
      const response = await usersUpdate(token, formData);

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully:", data);
        setUserData(formData); // update local userData state with the new data
        setIsEditMode(false); // exit edit mode
      } else if (response.status === 400) {
        setIsDialogVisible(true); // show the dialog
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <AdminHeader />

      {userProfile ? (
        <Row>
          <Col md={2}>
            <AdminSidebar />
          </Col>
          <Col md={8}>
            <div className="container col-md-8 mx-auto pt-5">
              <div>
                <h3 className="card-title py-4 text-center">
                  Korisnički profil
                </h3>
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
                    {/* <div>
                      <Form.Label className="gray-text">
                        Putanja do slike:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={slika}
                        onChange={(event) => setImgPath(event.target.value)}
                      />
                    </div> */}
                  </Form>
                ) : (
                  <div className="stack" tokens={{ childrenGap: 20 }}>
                    <div className="gray-text py-2">
                      Ime: <span className="font-bold">{ime}</span>
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
          </Col>
        </Row>
      ) : (
        <span className="loading-text">Loading...</span>
      )}

      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Error",
          subText: "Username or email is already taken.",
        }}
      />
    </div>
  );
}

export default Profile;
