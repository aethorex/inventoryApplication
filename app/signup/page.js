"use client";

import styles from "./signup.module.css";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        //object sets HTTP headers for your response.
        "Content-Type": "application/json", //tells the browser (or client) that the response body is JSON.
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log("data gone successfully");
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up</h1>
        <input
          placeholder="Enter Shop Name"
          className={styles.input}
          type="text"
          {...register("name", { required: true })}
        />
        <input
          placeholder="Phone Number"
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
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
