"use client";

import styles from "./login.module.css";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        //object sets HTTP headers for your response.
        "Content-Type": "application/json", //tells the browser (or client) that the response body is JSON.
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.success) {
      console.log(response.user);
      localStorage.setItem("number", response.user.number);
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <input
          placeholder="Enter Mobile Number"
          className={styles.input}
          type="number"
          {...register("number", { required: true })}
        />
        <input
          placeholder="Enter shop password"
          className={styles.input}
          type="password"
          {...register("pass", { required: true })}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <br />
        <p>
          If you are not a user please <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

// localStorage.setItem("number", number);