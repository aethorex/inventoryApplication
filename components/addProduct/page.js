"use client";

import styles from "./addProduct.module.css";
import { useForm } from "react-hook-form";

export default function AddProduct({
  setAddIsVisible,
  user,
  fetchProducts,
  setLoading
}) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setAddIsVisible(false);

    const payload = {
      ...data,
      number: user, // 👈 include user here
    };

    // fetch
    setLoading(true);
    const res = await fetch("/api/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    fetchProducts();
  };

  return (
    <div className={styles.background} onClick={() => setAddIsVisible(false)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()} // StopPropagation is doing here -> stopping any event on CLICK in from.
      >
        <input
          placeholder="Enter product name"
          className={styles.input}
          type="text"
          {...register("name", { required: true })}
        />
        <input
          placeholder="Stock"
          className={styles.input}
          type="number"
          {...register("stock", { required: true })}
        />
        <input
          placeholder="Price"
          className={styles.input}
          type="number"
          {...register("price", { required: true })}
        />
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
