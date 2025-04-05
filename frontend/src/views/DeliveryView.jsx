import React from "react";
import { useGlobalContext } from "../components/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import DeliveryEmpty from "../components/Delivery/DeliveryEmpty/DeliveryEmpty";
import DeliveryItem from "../components/Delivery/DeliveryItem/DeliveryItem";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const DeliveryView = () => {
  const { orders, auth, modal } = useGlobalContext();
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (auth.state.user) {
      setLoadingOrders(true);

      const fetchOrders = async () => {
        if (orders.state.orders.length <= 0) {
          await orders.getOrders(auth.state.user.id);
        }
        setLoadingOrders(false);
      };

      fetchOrders();
    } else {
      modal.openModal(false);
    }
  }, [auth.state.user]);

  const reloadOrders = async () => {
    setDisabled(true);
    toast.info("Reloading orders...");
    await orders.getOrders(auth.state.user.id);
    setDisabled(false);
    toast.success("Orders reloaded!");
  };

  return (
    <div style={{ minHeight: "65vh", display: "flex", flexDirection: "column" }}>
      {auth.state.user == null ? (
        <DeliveryEmpty />
      ) : (
        <div style={{ flex: 1, paddingInline: "1rem", paddingTop: "2rem" }}>
          <div className="reload-orders" style={{ textAlign: "right", marginBottom: "1rem" }}>
            <button
              className="btn-rounded"
              onClick={reloadOrders}
              disabled={disabled}
            >
              Reload Orders
            </button>
          </div>

          {loadingOrders ? (
            <Skeleton height={500} />
          ) : orders.state.orders.length > 0 ? (
            orders.state.orders.map((order) => (
              <DeliveryItem key={order._id} order={order} />
            ))
          ) : (
            <div
              style={{
                padding: "3rem 1rem",
                textAlign: "center",
                color: "#666",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🧾</div>
              <h2 style={{ fontWeight: "600", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                No Orders Yet
              </h2>
              <p style={{ fontSize: "1rem", color: "#999" }}>
                You haven't placed any orders yet. Once you do, they'll appear here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryView;