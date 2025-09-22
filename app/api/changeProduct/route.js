import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    const { number, name, price, stock } = await request.json();


    if (!number || !name || !price) {
      return NextResponse.json({
        success: false,
        error: "Missing number, name, or price",
      });
    }

    const rename = name.toLowerCase().trim();
    
    await client.connect();

    const db = client.db("inventory");
    const collection = db.collection(number);

    await collection.updateOne(
      {},
      { $set: { [`products.${rename}`]: { stock, price } } },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
