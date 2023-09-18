import React, { useEffect, useState, useContext } from "react";
import {  Button } from "react-bootstrap";
import { AuthContext } from "../../../context/authContext";
import CustomerHeader from "./customerHeader";
import CustomerSidebar from "./customerSidebar";
import { Row, Col } from "react-bootstrap";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react";
import "./customerMyOrders.css";
import { apiOrders, declineOrder } from "../../../services/orderService";
import { XCircleFill } from "react-bootstrap-icons";
import Alert from 'react-bootstrap/Alert';

function CustomerMyOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await apiOrders(token);
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogVisible(true);
  };

  const handleCancelOrder = async (orderId)=>{
    try{
      const response = await declineOrder(token, orderId)
  
      if (response.ok){
        const data = await response.json()
        console.log(data)
        if(data.declined){
          setAlertSuccess(true)
        setTimeout(() => {
          setAlertSuccess(false); 
        }, 1500);
        }else{
          setAlertFail(true)
        setTimeout(() => {
          setAlertFail(false); 
        }, 1500);
        }
        
        setOrders([])
        fetchData()
      }else{
        console.log("nay")
      }
    }catch(error){
      console.error("error: ", error)
    }
    
  }

  const formatDeliveryTime = (deliveryTime) => {
    const hours = Math.floor(deliveryTime);
    const minutes = Math.round((deliveryTime - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container">
      <CustomerHeader />
      <Row>
      <div className="mx-auto pt-5" >
      <Alert show={alertSuccess} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>Successfully cancelled order</p>
      </Alert>
      <Alert show={alertFail} variant="danger">
        <Alert.Heading>Failed!</Alert.Heading>
        <p>Cannot cancel that order</p>
      </Alert>
        </div>
        <Col md={3}>
          <CustomerSidebar />
        </Col>
        <Col md={9}>
          <div className="card-container">
            {orders.map((order) => (
              <div key={order.id} className="order-card document-card">
                <div className="order-info">
                  <div className="order-details">
                    <div className="document-card-div">
                      <Row>
                        <Col>Address:</Col>
                        <Col md={6}>{order.adresaDostave}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col>Comment:</Col>
                        <Col md={6}>{order.komentar}</Col>
                      </Row>
                      <Row>
                        <Col>Total Price: </Col>
                        <Col md={6}>{order.ukupnaCena}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col>Delivery Time:</Col>
                        <Col md={6}>
                          {formatDeliveryTime(order.vremeDostave)}
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                        <Col md={6}></Col>
                      </Row>
                    </div>
                  </div>
                  <div className="w-100">
                    {order.listaArtikla.map((item) => (
                      <div key={item.id} className="">
                        <div className="d-block mx-auto text-center">
                          <img
                            src={item.artikal.fotografija || "placeholder-image-url"}
                            alt="Product Image"
                            width={100}
                            className="d-block mx-auto mb-4"
                            height={100}
                          />
                        </div>
                        <div className="item-details text-center">
                          <h3 className="text-center">{item.artikal.naziv}</h3>
                          <div className="document-card-div">
                            <span>
                              Quantity: <strong>{item.kolicina}</strong>
                            </span>
                            <br />
                            <span>
                              Price: <strong>{item.cena}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => handleViewDetails(order)}
                  className="view-details-button primary-button"
                >
                  View Details
                </Button>
                     
                <XCircleFill
                className="product-quantity-button mx-auto mt-3"
                onClick={() =>
                  handleCancelOrder(order.id)
                } 
                />

              </div>
            ))}
          </div>
          <Dialog
            hidden={!isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}
            dialogContentProps={{
              type: DialogType.normal,
              title: "Order Details",
            }}
          >
            {selectedOrder && (
              <div className="dialog-content">
                <div className="document-card-div">
                  <span>
                    Address: <strong>{selectedOrder.adresaDostave}</strong>
                  </span>
                  <br />
                  <span>
                    Comment: <strong>{selectedOrder.komentar}</strong>
                  </span>
                  <br />
                  <span>
                    Total Price: <strong>{selectedOrder.ukupnaCena}</strong>
                  </span>
                  <br />
                  <span>
                    Delivery Time:{" "}
                    <strong>
                      {formatDeliveryTime(selectedOrder.vremeDostave)}
                    </strong>
                  </span>
                </div>
                <div className="dialog-items">
                  {selectedOrder.listaArtikla.map((item) => (
                    <div
                      key={item.id}
                      className="dialog-item text-center margin-auto"
                    >
                      <img
                        src={item.artikal.fotografija || "placeholder-image-url"}
                        alt="Product Image"
                        width={80}
                        className="mx-auto d-block"
                        height={80}
                      />
                      <div className="item-details">
                        <h3>{item.artikal.naziv}</h3>
                        <div className="document-card-div">
                          <span>
                            Quantity: <strong>{item.kolicina}</strong>
                          </span>
                          <span>
                            Price: <strong>{item.cena}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                className="primary-button"
                onClick={() => setIsDialogVisible(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </Dialog>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerMyOrders;
