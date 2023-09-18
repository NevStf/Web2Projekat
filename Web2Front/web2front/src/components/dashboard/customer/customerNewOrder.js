import React, { useContext, useState, useEffect } from "react";

import { Button, Form } from "react-bootstrap";
import CartContext from "../../../context/cartContext";
import CustomerHeader from "./customerHeader";
import "./customerNewOrder.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import {
  Add16Regular,
  Subtract16Filled,
} from "@fluentui/react-icons";
import { postOrders } from "../../../services/orderService";
import CustomerSidebar from "./customerSidebar";
import { Row, Col } from "react-bootstrap";
import { Modal } from "@fluentui/react";

function CustomerNewOrder() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
 
  const [addressError, setAddressError] = useState(false); 
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let calculatedTotal = 0;
    if (cartItems) {
      Object.values(cartItems).forEach((item) => {
        calculatedTotal += item.product.cena * item.quantity;
      });
    }
    setTotal(calculatedTotal + 200);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!cartItems || Object.values(cartItems).length === 0) {
      return;
    }

    if (!address) {
      setAddressError(true); 
      return;
    }

    setAddressError(false); 

    const productQuantities = Object.values(cartItems).map((item) => ({
        artikalID: item.product.id,
        kolicina: item.quantity,
    }));

    const orderData = {
      artikliKolicina: productQuantities,
      komentar: comment,
      adresaDostave: address,
    };

    try {
      const response = await postOrders(token, orderData);
      
       
       
      if (response.ok) {
        const info = await response.json();
        setMessage("Your purchase is saved!\nIt will be delivered in the next "+info.vremeDostave+"h");
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);       
          setCartItems({});
          navigate("/customer-dashboard");
        }, 3000);
      } else {
        setMessage("There is no enough quantity!");
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleQuantityChange = (itemId, newValue) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].quantity = parseInt(newValue, 10);
    setCartItems(updatedCartItems);
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = { ...cartItems };
    if (updatedCartItems[itemId].quantity > 1) {
      updatedCartItems[itemId].quantity -= 1;
      setCartItems(updatedCartItems);
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
          {cartItems && Object.values(cartItems).length > 0 ? (
            <div className="cart-items-container mx-auto pt-5">
              {Object.values(cartItems).map((item) => (
                <div key={item.product.id} className="cart-item">
                  <h3 className="cart-item-name">{item.product.naziv}</h3>
                  <div className="cart-item-details">
                    <p className="cart-item-quantity pt-2">Količina:</p>
                    <div className="quantity-controls">
                      <Subtract16Filled
                        onClick={() => handleDecrement(item.product.id)}
                        className="quantity-decrement"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(item.product.id, e.target.value)
                        }
                        className="cart-item-quantity-input"
                      />
                      <></>
                      <Add16Regular
                        onClick={() => handleIncrement(item.product.id)}
                        className="quantity-increment"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Form.Group controlId="address">
                <Form.Label className="pt-2">Address: </Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required 
                  className={
                    addressError
                      ? "checkout-address is-invalid"
                      : "checkout-address"
                  }
                />
                {addressError && (
                  <Form.Control.Feedback type="invalid">
                    Type address in!
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <p className="pt-3">Comment:</p>
              <textarea
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="checkout-comment"
              ></textarea>
              <p className="total-amount">Your bill is: {total} dolars</p>
              <div className="checkout-buttons">
                <Button
                  onClick={handleCheckout}
                  className="checkout-button w-100"
                >
                  Order with delivery
                </Button>
              </div>
            </div>
          ) : (
            <div className="cart-items-container mx-auto pt-5"><p className="empty-cart-message">Your cart is empty!</p></div>
            
          )}
        </Col>
      </Row>


      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">{message}</h3>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerNewOrder;
