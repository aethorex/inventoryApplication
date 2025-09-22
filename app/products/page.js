'use client'

import AddProduct from "@/components/addProduct/page";
import styles from "./products.module.css";
import { useState, useEffect } from "react";
import ChangeProduct from "@/components/ChangeProduct/page";

export default function Products() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [addIsVisible, setAddIsVisible] = useState(false);
  const [changeIsVisible, setChangeIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  // get products
  const fetchProducts = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/getProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: user }),
      });
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // refresh products
  useEffect(() => {
    fetchProducts();
  }, [user]);

  //get user
  useEffect(() => {
    const number = localStorage.getItem("number");
    if (number) setUser(number);
    setReady(true);
  }, []);

  // delete handeling
  async function handleDelete(name) {
    setLoading(true);
    const payload = {
      selectedProduct: name,  // ✅ send correct product name
      number: user
    };

    const res = await fetch("/api/deleteProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log("data gone successfully");
    }
    fetchProducts();
  }
  return (
    <>
      {addIsVisible && (
        <AddProduct
          setAddIsVisible={setAddIsVisible}
          user={user}
          setLoading={setLoading}
          fetchProducts={fetchProducts}
        />
      )}
      {changeIsVisible && (
        <ChangeProduct
          setChangeIsVisible={setChangeIsVisible}
          user={user}
          setLoading={setLoading}
          fetchProducts={fetchProducts}
          name={selectedProduct}
          price={price}
          stock={stock}
        />
      )}
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>Products</h1>
          <button onClick={() => setAddIsVisible(true)} disabled={!ready}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(products).map(([name, details]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{details.stock}</td>
                  <td>{details.price}</td>
                  <td>
                    <span
                      className={styles.statusOfOrder}
                      onClick={() => {
                        setChangeIsVisible(true);
                        setSelectedProduct(name);
                        setStock(details.stock);
                        setPrice(details.price);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="28"
                        height="20"
                        role="img"
                        aria-labelledby="swapTitle"
                      >
                        <title id="swapTitle">Change Status</title>
                        <path
                          d="M7 7h11l-4-4m4 14H7l4 4"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        Change Status
                      </svg>
                    </span>
                    <span
                      className={styles.statusOfOrder}
                      onClick={() => {
                        handleDelete(name);
                      }}
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        viewBox="0 0 488.936 488.936"
                        width="28"
                        height="28"
                        fill="red"
                      >
                        <title id="deleteTitle">Delete</title>
                        <g>
                          <g>
                            <path d="M381.16,111.948H107.376c-6.468,0-12.667,2.819-17.171,7.457c-4.504,4.649-6.934,11.014-6.738,17.477l9.323,307.69
          c0.39,12.92,10.972,23.312,23.903,23.312h20.136v-21.012c0-24.121,19.368-44.049,43.488-44.049h127.896
          c24.131,0,43.893,19.928,43.893,44.049v21.012h19.73c12.933,0,23.52-10.346,23.913-23.268l9.314-307.7
          c0.195-6.462-2.234-12.863-6.738-17.513C393.821,114.767,387.634,111.948,381.16,111.948z"/>
                            <path d="M309.166,435.355H181.271c-6.163,0-11.915,4.383-11.915,11.516v30.969c0,6.672,5.342,11.096,11.915,11.096h127.895
          c6.323,0,11.366-4.773,11.366-11.096v-30.969C320.532,440.561,315.489,435.355,309.166,435.355z"/>
                            <path d="M427.696,27.106C427.696,12.138,415.563,0,400.591,0H88.344C73.372,0,61.239,12.138,61.239,27.106v30.946
          c0,14.973,12.133,27.106,27.105,27.106H400.59c14.973,0,27.105-12.133,27.105-27.106L427.696,27.106L427.696,27.106z"/>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
