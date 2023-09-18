import React, { useEffect, useState, useContext } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  PrimaryButton,
  Image,
  Dialog,
  DialogType,
  DialogFooter,
  Stack,
  Text,
} from "@fluentui/react";
import { Row, Col } from "react-bootstrap";
import SellerHeader from "./sellerHeader";
import { Button } from "react-bootstrap";
import "./sellerOldOrders.css";
import { sellersOldOrders } from "../../../services/orderService";
import { AuthContext } from "../../../context/authContext";
import AdminHeader from "../admin/adminHeader";
import SellerSidebar from "./sellerSidebar";

function SellersOldOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await sellersOldOrders(token);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogVisible(true);
  };

  const formatDeliveryTime = (deliveryTime) => {
    const hours = Math.floor(deliveryTime);
    const minutes = Math.round((deliveryTime - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container">
      <SellerHeader />
      <Row>
        <Col md={3}>
          <SellerSidebar />
        </Col>
        <Col md={9}>
          <div className="card-container">
            {orders.map((order) => (
              <DocumentCard
                key={order.id}
                className="order-card delivered document-card"
              >
                <div className="order-info">
                  <div className="order-details">
                    <div className="document-card-div">
                      <span>
                        Address: <strong>{order.adresaDostave}</strong>
                      </span>
                      <span>
                        Comment: <strong>{order.komentar}</strong>
                      </span>
                      <span>
                        Total Price: <strong>{order.ukupnaCena}</strong>
                      </span>
                      <span>
                        Delivery Time: <strong>Delivered</strong>
                      </span>
                    </div>
                  </div>
                  <div className="order-items">
                    {order.listaArtikla.map((item) => (
                      <div key={item.id} className="order-item">
                        <Image
                          src={item.artikal.fotografija || "placeholder-image-url"}
                          alt="Product Image"
                          width={100}
                          height={100}
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
                <Button
                  onClick={() => handleViewDetails(order)}
                  className="view-details-button"
                >
                  {" "}
                  View Details
                </Button>
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
          title: "Order Details",
        }}
      >
        {selectedOrder && (
          <div className="dialog-content">
            <div className="document-card-div">
              <span>
                Address: <strong>{selectedOrder.adresaDostave}</strong>
              </span>
              <span>
                Comment: <strong>{selectedOrder.komentar}</strong>
              </span>
              <span>
                Total Price: <strong>{selectedOrder.ukupnaCena}</strong>
              </span>
              <span>
                Delivery Time:{" "}
                <strong>
                  {formatDeliveryTime(selectedOrder.vremeDostave)}
                </strong>
              </span>
            </div>
            <div className="dialog-items">
              {selectedOrder.listaArtikla.map((item) => (
                <div key={item.id} className="dialog-item">
                  <Image
                    src={item.artikal.fotografija || "placeholder-image-url"}
                    alt="Product Image"
                    width={80}
                    height={80}
                  />
                  <div className="item-details">
                    <div>{item.artikal.naziv}</div>
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
          <Button onClick={() => setIsDialogVisible(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default SellersOldOrders;
