"use client";

import styles from "./addCostumerDetail.module.css";
import { useForm } from "react-hook-form";

export default function AddCostumerDetail() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter costumer name"
          className={styles.input}
          type="text"
          {...register("name")}
        />
        <input
          placeholder="Amount"
          className={styles.input}
          type="number"
          {...register("number")}
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
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}
