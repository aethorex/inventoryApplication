"use client";

import styles from "./change.module.css";
import { useForm } from "react-hook-form";

export default function ChangeProduct({
  setChangeIsVisible,
  user,
  fetchProducts,
  setLoading,
  name,
  price,
  stock
}) {
  // Pass default values from props
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      stock: stock,
      price: price,
    },
  });

  const onSubmit = async (data) => {
    setChangeIsVisible(false);

    const payload = {
      number: user,
      name,
      stock: data.stock,
      price: data.price,
    };

    setLoading(true);
    const res = await fetch("/api/changeProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("item not found!");
    }
    fetchProducts();
  };

  return (
    <div className={styles.background} onClick={() => setChangeIsVisible(false)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          placeholder="Stock"
          className={styles.input}
          type="number"
          {...register("stock", { valueAsNumber: true, required: true })}
        />
        <input
          placeholder="Price"
          className={styles.input}
          type="number"
          {...register("price", { valueAsNumber: true, required: true })}
        />
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
