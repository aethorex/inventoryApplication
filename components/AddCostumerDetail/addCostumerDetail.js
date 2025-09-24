"use client";

import styles from "./addCostumerDetail.module.css";
import { useForm, useFieldArray } from "react-hook-form";

export default function AddCostumerDetail({
  setAddIsVisible,
  fetchOrders,
  fetchProducts,
  user,
  setLoading
}) {
  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
    defaultValues: {
      items: [{ product: "", quantity: 1 }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const onSubmit = async (data) => {
    setAddIsVisible(false);

    const payload = {
      ...data,
      number: user,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/addOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) {
        alert(result.error || "Something went wrong");
      } else {
        fetchOrders();
        fetchProducts();
      }
    } catch (err) {
      alert("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background} onClick={() => setAddIsVisible(false)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          placeholder="Enter customer name"
          className={styles.input}
          type="text"
          {...register("name", { required: true })}
        />
        <div>
          {fields.map((item, index) => (
            <div key={item.id} style={{ display: "flex", gap: "8px", marginBottom: 8 }}>
              <input
                placeholder="Item"
                className={styles.input}
                type="text"
                {...register(`items.${index}.product`, { required: true })}
                style={{ flex: 2 }}
              />
              <input
                placeholder="Qty"
                className={styles.input}
                type="number"
                min={1}
                {...register(`items.${index}.quantity`, { required: true, min: 1 })}
                style={{ flex: 1 }}
              />
              {fields.length > 1 && (
                <button className={styles.button} type="button" onClick={() => remove(index)} style={{ color: "red" }}>-</button>
              )}
            </div>
          ))}
          <button className={styles.button} type="button" onClick={() => append({ product: "", quantity: 1 })}>+ Add Item</button>
        </div>
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
