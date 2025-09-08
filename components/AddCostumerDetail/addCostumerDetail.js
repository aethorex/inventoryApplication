"use client";

import styles from "./addCostumerDetail.module.css";
import { useForm } from "react-hook-form";

export default function AddCostumerDetail({
  isVisible,
  setIsVisible,
  fetchOrders,
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setIsVisible(false);

    //fetch
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        //object sets HTTP headers for your response.
        "Content-Type": "application/json", //tells the browser (or client) that the response body is JSON.
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log("data gone successfully");
    }
    fetchOrders();
  };

  return (
    <div className={styles.background} onClick={() => setIsVisible(false)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()} //! StopPropagation is doing here -> stopping any event on CLICK in from.
      >
        <input
          placeholder="Enter customer name"
          className={styles.input}
          type="text"
          {...register("name")}
        />
        <input
          placeholder="Amount"
          className={styles.input}
          type="number"
          {...register("amount")}
        />
        <div className={styles.status}>
          <input
            type="radio"
            id="tbd"
            value="To be Delivered"
            {...register("status")}
          />
          <label htmlFor="tbd"> To be Delivered</label>
          <br />
          <input
            type="radio"
            id="progress"
            value="progress"
            {...register("status")}
          />
          <label htmlFor="progress"> Delivery in Progress</label>
          <br />
          <input
            type="radio"
            id="delivered"
            value="delivered"
            {...register("status")}
          />
          <label htmlFor="delivered"> Delivered</label>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
