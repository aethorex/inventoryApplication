import styles from './sidemenu.module.css';
import Link from 'next/link';

export default function SideMenu() {
  return (
    <div className={styles.sideMenu}>
      <ul>
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/report">Report</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
