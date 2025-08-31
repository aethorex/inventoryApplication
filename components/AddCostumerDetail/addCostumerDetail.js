import styles from "./addCostumerDetail.module.css";

export default function AddCostumerDetail() {
  return (
    <div className={styles.background}>
      <form className={styles.form}>
        <input
          placeholder="Enter costumer name"
          className={styles.input}
          type="text"
          name="name"
        />
        <input
          placeholder="Amount"
          className={styles.input}
          type="number"
          name="number"
        />
        <div className={styles.status}>
          <input type="radio" id="tbd" name="status" value="tbd" />
          <label htmlFor="tbd"> To be Delivered</label>
          <br />
          <input type="radio" id="tbd" name="status" value="tbd" />
          <label htmlFor="tbd"> Delivery in Progress</label>
          <br />
          <input type="radio" id="tbd" name="status" value="tbd" />
          <label htmlFor="tbd"> Delivered</label>
        </div>
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
}
