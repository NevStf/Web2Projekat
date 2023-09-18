import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
//import "./CustomerProducts.css";
import CustomerHeader from "./customerHeader";
import { PlusCircle } from "react-bootstrap-icons";
import CartContext from "../../../context/cartContext";
import AdminHeader from "../admin/adminHeader";
import { Container, Row, Col } from "react-bootstrap";

import { apiArticle } from "../../../services/articleService";
import CustomerSidebar from "./customerSidebar";

function CustomerDashboard() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState([]); // Changed to an array of quantities

  const fetchProducts = useCallback(async () => {
    
    try {
        console.log("asdasd")
      const response = await apiArticle(token);
      console.log(response)
      const data = await response.json();
     
      if (response.ok) {
        setProducts(data);
        setQuantities(new Array(data.length).fill(1)); // Initialize quantities array with default value 1
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setQuantities([]); // Initialize quantities as an empty array before fetching products
      fetchProducts();
    }
  }, [token, fetchProducts]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: {
        product,
        quantity: Number(quantity),
      },
    }));
  };

  const handleQuantityChange = (index, newValue) => {
    if (/^\d*$/.test(newValue) && Number(newValue) > 0) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = newValue;
        return newQuantities;
      });
    }
  };

  return (
    <div className="container">
      <CustomerHeader />
      <Row>
        <Col md={3}>
          <CustomerSidebar />
        </Col>
        <Col md={9} className="pt-4">
          <div className="product-grid pt-5">
            {products.map((product, index) => ( 
              <div key={product.id} className="product-card product-dashboard">
                <div className="">
                  <div className="product-image">
                    <img
                      src={product.fotografija || "placeholder-image-url"}
                      alt="Product Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="product-details">
                    <h2>{product.naziv}</h2>
                    <div className="product-details">
                      <p>Price: {product.cena}</p>
                      <p>Description: {product.opis}</p>
                      <div className="product-quantity mx-auto">
                        <span className="product-quantity-label">
                          Quantity:
                        </span>
                        <input
                          className="product-quantity-field"
                          type="number"
                          value={quantities[index]?.toString() || ""}
                          min={1}
                          onChange={(event) =>
                            handleQuantityChange(index, event.target.value)
                          }
                        />
                      </div>
                      <PlusCircle
                        className="product-quantity-button mx-auto mt-3"
                        onClick={() =>
                          handleAddToCart(product, quantities[index])
                        } // Use the corresponding quantity from the array
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerDashboard;
