import styles from './navbar.module.css'

export default function NavBar() {

  // ! in api
  // const { name, email, pass } = req.body
  // const nayaUser = new dbWaleBhiya({ name, email, pass })
  // await nayaUser.save()
  // res.redirect('/login')

  return (
    <nav className={styles.nav}>
      <div className={styles.login}><h1><a href="/login">Login</a></h1></div>
      <div className={styles.search}><h1>Search...</h1></div>
      <div className={styles.msg}><h1>Msg</h1></div>
    </nav>
  );
}
