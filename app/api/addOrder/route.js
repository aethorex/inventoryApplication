import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    const { number, name, status, items } = await request.json();

    if (!number || !name || !status || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    await client.connect();

    const db = client.db("inventory");
    const collection = db.collection(number);

    // Get current products
    const currentDoc = await collection.findOne({});
    if (!currentDoc?.products) {
      return NextResponse.json({
        success: false,
        error: "No products found",
      });
    }

    let totalPrice = 0;
    const updates = {};
    for (const { product, quantity } of items) {
      const rename = product.toLowerCase().trim();
      const prod = currentDoc.products[rename];
      if (!prod) {
        return NextResponse.json({
          success: false,
          error: `Product "${product}" does not exist`,
        });
      }
      if (prod.stock < quantity) {
        return NextResponse.json({
          success: false,
          error: `Not enough stock for "${product}"`,
        });
      }
      totalPrice += prod.price * quantity;
      updates[`products.${rename}.stock`] = prod.stock - quantity;
    }

    // Save order
    await collection.updateOne(
      {},
      {
        $set: {
          [`orders.${name}`]: {
            items,
            status,
            totalPrice,
          },
          ...updates
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, totalPrice });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
