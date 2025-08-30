import styles from './navbar.module.css'

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.login}><h1>Login</h1></div>
      <div className={styles.search}><h1>Search...</h1></div>
      <div className={styles.msg}><h1>Msg</h1></div>
    </nav>
  );
}
