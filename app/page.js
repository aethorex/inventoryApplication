"use client";
import styles from "./page.module.css";
import AddCostumerDetail from "@/components/AddCostumerDetail/addCostumerDetail";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [orders, setOrders] = useState([]); // orders = array

  const fetchOrders = async () => {
    try {
      const res = await fetch("./api/getOrders"); // automatically calls GET
      const data = await res.json();
      if (data.success) {
        setOrders(data.allData);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

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
                onClick={() => setIsVisible(true)}
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
            {isVisible && (
              <AddCostumerDetail
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                fetchOrders={fetchOrders}
              />
            )}
            <div className={styles.ordersOfClient}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.name}</td>
                      <td>{order.amount}</td>
                      <td>
                        {order.status}{" "}
                        <span
                          className={styles.statusOfOrder}
                          onClick={() => setIsVisible(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="28"
                            height="28"
                            role="img"
                            aria-labelledby="swapTitle"
                          >
                            <title id="swapTitle">Change Status</title>
                            <path
                              d="M7 7h11l-4-4m4 14H7l4 4"
                              stroke="currentColor"
                              fill="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            Change Status
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
