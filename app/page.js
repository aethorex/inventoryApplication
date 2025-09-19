"use client";
import styles from "./page.module.css";
import AddCostumerDetail from "@/components/AddCostumerDetail/addCostumerDetail";
import ChangeStatus from "@/components/changeStatus/ChangeStatus";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState();
  const [addIsVisible, setAddIsVisible] = useState(false);
  const [changeIsVisible, setChangeIsVisible] = useState(false);
  const [orders, setOrders] = useState([]); // orders = array
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/getOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: user }),
      });
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("number");
    if (user) {
      setUser(user);
      console.log(user);
    }
  }, []);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.mainContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>📦</span>
              <h2 className={styles.cardTitle}>Total Products</h2>
            </div>
            <div className={styles.cardValue}>10</div>
          </div>

          {/* Low Stock Items */}
          <div className={`${styles.card} ${styles.lowStockCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🏷️</span>
              <h2 className={styles.cardTitle}>Low Stock Items</h2>
            </div>
            <div className={styles.cardValue}>8</div>
            <div className={styles.cardAlert}>
              <span className={styles.alertIcon}>⚠️</span>
              <span>3 items critically low!</span>
            </div>
          </div>

          {/* Total Stock Value */}
          <div className={`${styles.card} ${styles.totalStock}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>💰</span>
              <h2 className={styles.cardTitle}>Total Stock Value</h2>
            </div>
            <div className={styles.cardValue}>value</div>
          </div>

          <div className={`${styles.card} ${styles.totalStock}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>💰</span>
              <h2 className={styles.cardTitle}>Total Stock Value</h2>
            </div>
            <div className={styles.cardValue}>value</div>
          </div>
        </div>

        <div className={styles.recentOrderAndLowItems}>
          <div className={styles.recentOrder}>
            <h1 className={styles.recentOrders}>
              Recent Order of Costumer{"  "}
              <button
                className={styles.button}
                onClick={() => setAddIsVisible(true)}
              >
                <span className={styles.spanmother}>
                  <span>A</span>
                  <span>d</span>
                  <span>d</span>
                </span>
                <span className={styles.spanmother2}>
                  <span>O</span>
                  <span>r</span>
                  <span>d</span>
                  <span>e</span>
                  <span>r</span>
                </span>
              </button>
            </h1>
            {addIsVisible && (
              <AddCostumerDetail
                setAddIsVisible={setAddIsVisible}
                fetchOrders={fetchOrders}
                user={user}
              />
            )}
            {changeIsVisible && (
              <ChangeStatus
                setChangeIsVisible={setChangeIsVisible}
                fetchOrders={fetchOrders}
                itemID={selectedOrderId}
                user={user}
              />
            )}
            <div className={styles.ordersOfClient}>
              {loading ? (
                <></>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(orders).map(([name, details]) => (
                      <tr key={name}>
                        <td>{name}</td>
                        <td>{details.amount}</td>
                        <td>
                          {details.status}{" "}
                          <span
                            className={styles.statusOfOrder}
                            onClick={() => {
                              setChangeIsVisible(true);
                              setSelectedOrderId(name);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="28"
                              height="20"
                              role="img"
                              aria-labelledby="swapTitle"
                            >
                              <title id="swapTitle">Change Status</title>
                              <path
                                d="M7 7h11l-4-4m4 14H7l4 4"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              Change Status
                            </svg>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className={styles.lowItems}>
            <h1>Low items in your shop</h1>
          </div>
        </div>
      </div>
    </>
  );
}
