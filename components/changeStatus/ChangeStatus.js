"use client";

import styles from "./changeStatus.module.css";
import { useForm } from "react-hook-form";

export default function ChangeStatus({
  setChangeIsVisible,
  fetchOrders,
  itemID,
  user
}) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setChangeIsVisible(false);

    const payload = {
      ...data,
      itemID,
      number: user
    };

    //fetch
    const res = await fetch("/api/update", {
      method: "POST",
      headers: {
        //object sets HTTP headers for your response.
        "Content-Type": "application/json", //tells the browser (or client) that the response body is JSON.
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      console.log("data gone successfully");
    }
    fetchOrders();
  };

  return (
    <div className={styles.background} onClick={() => setChangeIsVisible(false)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()} // StopPropagation is doing here -> stopping any event on CLICK in from.
      >
        <div className={styles.status}>
          <input
            type="radio"
            id="tbd"
            value="To be Delivered"
            {...register("status", {required: true})}
          />
          <label htmlFor="tbd"> To be Delivered</label>
          <br />
          <input
            type="radio"
            id="progress"
            value="progress"
            {...register("status", {required: true})}
          />
          <label htmlFor="progress"> Delivery in Progress</label>
          <br />
          <input
            type="radio"
            id="delivered"
            value="delivered"
            {...register("status", {required: true})}
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