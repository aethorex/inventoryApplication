import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    const { number, name, amount, status, product } = await request.json();

    if (!number || !name || !status || !product) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    await client.connect();

    const db = client.db("inventory");
    const collection = db.collection(number);

    // ✅ Check product existence first
    const rename = product.toLowerCase().trim();
    const currentDoc = await collection.findOne({});

    if (!currentDoc?.products?.[rename]) {
      return NextResponse.json({
        success: false,
        error: `Product "${product}" does not exist`,
      });
    }

    // ✅ Product exists → proceed with order + stock update
    const currentStock = currentDoc.products[rename].stock;
    const newStock = currentStock - amount;

    // Update order
    await collection.updateOne(
      {},
      { $set: { [`orders.${name}`]: { product, status } } },
      { upsert: true }
    );

    // Update stock
    await collection.updateOne(
      {},
      { $set: { [`products.${rename}.stock`]: newStock } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, newStock });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
