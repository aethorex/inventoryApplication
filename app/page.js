import styles from "./page.module.css";
import Link from "next/link";
import AddCostumerDetail from "@/components/AddCostumerDetail/addCostumerDetail";

export default function Home() {
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
            <h1>Recent order of costumer</h1>
            <AddCostumerDetail />
          </div>
          <div className={styles.lowItems}>
            <h1>Low items in your shop</h1>
          </div>
        </div>
      </div>
    </>
  );
}
