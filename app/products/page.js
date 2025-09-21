'use client'

import AddProduct from "@/components/addProduct/page";
import styles from "./products.module.css";
import { useState, useEffect } from "react";

export default function Products() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [addIsVisible, setAddIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchProducts();
  }, [user]);

  useEffect(() => {
    const number = localStorage.getItem("number");
    if (number) setUser(number);
    setReady(true);
  }, []);

  useEffect(() => {
    console.log(products)
  }, [products])

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
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>Products</h1>
          <button onClick={() => setAddIsVisible(true)} disabled={!ready}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {loading ? (
          <></>
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
                  <td>actions</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
