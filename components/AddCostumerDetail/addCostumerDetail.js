"use client";

import styles from "./addCostumerDetail.module.css";
import { useForm } from "react-hook-form";

export default function AddCostumerDetail({
  setAddIsVisible,
  fetchOrders,
  fetchProducts,
  user,
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
    try {
      const res = await fetch("/api/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) {
        alert(result.error || "Something went wrong");
      } else {
        console.log("Order added successfully");
        fetchOrders();
        fetchProducts();
      }
    } catch (err) {
      alert("Network error, please try again later.");
      console.error("Error adding order:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background} onClick={() => setAddIsVisible(false)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()} // StopPropagation is doing here -> stopping any event on CLICK in from.
      >
        <input
          placeholder="Enter customer name"
          className={styles.input}
          type="text"
          {...register("name", { required: true })}
        />
        <input
          placeholder="Enter product name"
          className={styles.input}
          type="text"
          {...register("product", { required: true })}
        />
        <input
          placeholder="Amount of product"
          className={styles.input}
          type="number"
          {...register("amount", { required: true })}
        />
        <div className={styles.status}>
          <input
            type="radio"
            id="tbd"
            value="To be Delivered"
            {...register("status", { required: true })}
          />
          <label htmlFor="tbd"> To be Delivered</label>
          <br />
          <input
            type="radio"
            id="progress"
            value="progress"
            {...register("status", { required: true })}
          />
          <label htmlFor="progress"> Delivery in Progress</label>
          <br />
          <input
            type="radio"
            id="delivered"
            value="delivered"
            {...register("status", { required: true })}
          />
          <label htmlFor="delivered"> Delivered</label>
        </div>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
