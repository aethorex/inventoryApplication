"use client";
import styles from "./page.module.css";
import AddCostumerDetail from "@/components/AddCostumerDetail/addCostumerDetail";
import { useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

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
              <button className={styles.button} onClick={() => setIsVisible(true)}>
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
                  <tr>
                    <td>Abhi</td>
                    <td>500</td>
                    <td>Delivered</td>
                  </tr>
                  <tr>
                    <td>Ravi</td>
                    <td>1200</td>
                    <td>To be Delivered</td>
                  </tr>
                  <tr>
                    <td>Priya</td>
                    <td>750</td>
                    <td>Delivery in Progress</td>
                  </tr>
                  <tr>
                    <td>Abhi</td>
                    <td>500</td>
                    <td>Delivered</td>
                  </tr>
                  <tr>
                    <td>Ravi</td>
                    <td>1200</td>
                    <td>To be Delivered</td>
                  </tr>
                  <tr>
                    <td>Priya</td>
                    <td>750</td>
                    <td>Delivery in Progress</td>
                  </tr>
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
