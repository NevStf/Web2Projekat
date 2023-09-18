import React, { useState, useContext, useRef } from "react";
import {Modal } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import SellerHeader from "./sellerHeader";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./sellerNewProduct.css";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import { AuthContext } from "../../../context/authContext";
import { postProduct } from "../../../services/articleService";
import SellerSidebar from "./sellerSidebar";
import { Col, Row } from "react-bootstrap";


function SellerNewProduct() {
  const { token } = useContext(AuthContext);
  const [naziv, setName] = useState("");
  const [cena, setPrice] = useState("");
  const [opis, setDescription] = useState("");
  const [fotografija, setImgSrc] = useState(""); 
  const [error, setError] = useState("");
  const [kolicinaNaStanju, setQuantityInStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgSrc(reader.result);
    };

    reader.onerror = () => {
      console.error("An error occurred while reading the file");
      setImgSrc("");
      setError("Failed to read the file");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgSrc("");
    }
  };

  const handleSubmit = async () => {
    if (
      naziv.trim() === "" ||
      cena.trim() === "" ||
      kolicinaNaStanju.trim() === ""
    ) {
      setError("Sva polja su obavezna!");
      return;
    }

    if (isNaN(Number(cena)) || isNaN(Number(kolicinaNaStanju))) {
      setError("Cena i količina moraju biti brojevi!");
      return;
    }

    const formData = {
      naziv,
      cena: Number(cena),
      opis,
      fotografija,
      kolicinaNaStanju: Number(kolicinaNaStanju),
    };

    try {
      const response = await postProduct(token, formData);

      const data = await response.json();

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false); 
          navigate("/seller-dashboard");
        }, 3000);
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
        <Col md={3}>
          <SellerSidebar />
        </Col>
        <Col md={9}>
          <div className="new-product-container">
            <h2>New Product</h2>
            <div className="form-fields">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={naziv}
                  onChange={(event) => setName(event.target.value)}
                  required
                  isInvalid={error && !naziv.trim()}
                />
                {error && !naziv.trim() && (
                  <Form.Control.Feedback type="invalid">
                    Name is required
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={cena}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                  isInvalid={
                    error && (isNaN(Number(cena)) || cena.trim() === "")
                  }
                />
                {error && (isNaN(Number(cena)) || cena.trim() === "") && (
                  <Form.Control.Feedback type="invalid">
                    Price must be a number
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={opis}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Choose Image</Form.Label>
              <div className="upload-label">
                <div className="upload-icon">
                  <ArrowUpload16Filled />
                </div>
                <Form.Control
                  type="text"
                  value={fotografija ? fileInputRef.current.files[0].name : "Choose Image"}
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
              <Form.Group>
                <Form.Label>Quantity in Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={kolicinaNaStanju}
                  onChange={(event) => setQuantityInStock(event.target.value)}
                  required
                  isInvalid={
                    error &&
                    (isNaN(Number(kolicinaNaStanju)) ||
                    kolicinaNaStanju.trim() === "")
                  }
                />
                {error &&
                  (isNaN(Number(kolicinaNaStanju)) ||
                  kolicinaNaStanju.trim() === "") && (
                    <Form.Control.Feedback type="invalid">
                      Quantity in Stock must be a number
                    </Form.Control.Feedback>
                  )}
              </Form.Group>
            </div>
            <div className="submit-button">
              <Button
                className="primary-button"
                onClick={handleSubmit}
                styles={{ width: "100%" }}
              >
                Create Product
              </Button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Product successfully created!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default SellerNewProduct;
