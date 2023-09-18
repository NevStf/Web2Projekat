import React, { useEffect, useState, useContext, useCallback } from "react";
import {Image,Modal} from "@fluentui/react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./sellerProducts.css";
import { apiArticle, deleteArticle } from "../../../services/articleService";
import { AuthContext } from "../../../context/authContext";
import SellerSidebar from "./sellerSidebar";
import SellerHeader from "./sellerHeader";
import { Users } from "../../../services/userService";


function SellerProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [active, setActive]=useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await apiArticle(token);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token]);

  useEffect(() => {
    

    if (token) {
      fetchProducts();
     
      amIActive()
      
    }
  }, [token, fetchProducts]);

  const handleEditProduct = (product) => {
    navigate(`/seller-dashboard/update-product/${product.id}`, {
      state: { product },
    });
  };

  const amIActive = async () => {
    const response = await Users(token);
    const data = await response.json();
    if(response.ok){
      setActive(data.user.status === 1)
    }else{
      navigate("/login")
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteArticle(productId, token);

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          fetchProducts();
        }, 3000);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/seller-dashboard/new-product");
  };

  return (
    <div className="container">
      <SellerHeader />
      <Row>
        <Col md={3}>
          <SellerSidebar />
        </Col>
        <Col md={9}>
          
          <div className="add-product-container">
          {active ? 
            <Button 
              onClick={handleAddProduct}
              className="add-product-button primary-button"
            >
              {" "}
              Add item
            </Button>
            : <h3>Only verifyed sellers can create articles.</h3>}
          </div> 

          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card document-card">
                <div className="product-info">
                  <div className="product-image">
                    <Image
                      src={product.fotografija || "placeholder-image-url"}
                      alt="Product Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="product-details">
                    <h3>{product.naziv}</h3>
                    <div className="document-card-div">
                      <p>Price: {product.cena}</p>
                      <p>Quantity: {product.kolicinaNaStanju}</p>
                      <p>Description: {product.opis}</p>
                    </div>
                  </div>
                </div>
                <div className="product-actions">
                  <Button
                    onClick={() => handleEditProduct(product)}
                    className="edit-button primary-button"
                  >
                    Ažuriraj
                  </Button>
                  <Button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-button secondary-button"
                  >
                    Obriši
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Item deleted!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default SellerProducts;
