"use client";

import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

export default function NavBar() {
  const [user, setUser] = useState(null);

  //find user (you can use this to anywhere to find the loggedin user data)
  useEffect(() => {
    const number = localStorage.getItem("number");
    if (number) {
      fetch("/api/findUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
          }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.login}>
        <h1>
          {user ? (
            <>{user.name}</>
          ) : (
            <a href="/login">Login</a>
          )}
        </h1>
      </div>
      <div className={styles.search}>
        <h1>Search...</h1>
      </div>
      <div className={styles.msg}>
        <h1>Msg</h1>
      </div>
    </nav>
  );
}
