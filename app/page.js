import styles from "./page.module.css";
import DashBoard from "@/components/dashBoard/dashBoard";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.sideMenu}>
        <ul>
          <li>Dashboard</li>
          <li>Products</li>
          <li>Stock</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className={styles.content}>
        <DashBoard />
      </div>
    </main>
  );
}
