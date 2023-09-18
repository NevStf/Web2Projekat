import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal } from "@fluentui/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SellerHeader from "./sellerHeader";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./sellerUpdateProduct.css";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../context/authContext";
import { Button } from "react-bootstrap";
import { articleUpdate, apiArticleId } from "../../../services/articleService";

function UpdateProduct() {
  const { token } = useContext(AuthContext);
  const { productId } = useParams();
  const [naziv, setName] = useState("");
  const [cena, setPrice] = useState("");
  const [opis, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [kolicinaNaStanju, setQuantityInStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [fotografija, setImageSrc] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiArticleId(productId, token);
        const data = await response.json();
        if (response.ok) {
          const { naziv, cena, opis, fotografija, kolicinaNaStanju } = data;
          setName(naziv);
          setPrice(cena.toString());
          setDescription(opis);
          setQuantityInStock(kolicinaNaStanju.toString());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchProduct();
    }
  }, [token, productId]);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      naziv.trim() === "" ||
      cena.trim() === "" ||
      kolicinaNaStanju.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (isNaN(Number(cena)) || isNaN(Number(kolicinaNaStanju))) {
      setError("Price and Quantity in Stock must be numbers");
      return;
    }

    const productData = {
      id: productId,
      naziv: naziv,
      cena: Number(cena),
      opis: opis,
      kolicinaNaStanju: Number(kolicinaNaStanju),
      fotografija: fotografija, 
    };

    try {
      const response = await articleUpdate(token, productData);

      const data = await response.json();

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/seller-dashboard/products");
        }, 3000);
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <SellerHeader />
      <div className="update-product-container">
        <h2>Update Product</h2>
        <Form className="form-fields">
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
              isInvalid={error && (isNaN(Number(cena)) || cena.trim() === "")}
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
              as="textarea"
              value={opis}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Form.Group>
          <div className="">
            <Form.Group>
              <Form.Label>Choose Image</Form.Label>
              <div className="upload-label">
                <div className="upload-icon">
                  <ArrowUpload16Filled />
                </div>
                <Form.Control
                  type="text"
                  value={selectedFile ? selectedFile.name : "Choose Image"}
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
          </div>
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
        </Form>
        <div className="submit-button">
          <Button onClick={handleSubmit} styles={{ width: "100%" }}>
            Update Product{" "}
          </Button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Product successfully updated!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateProduct;
