import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    const { number, name, amount, status } = await request.json();

    if (!number || !name || !status) {
      return NextResponse.json({
        success: false,
        error: "Missing number, itemID, or status",
      });
    }

    await client.connect();

    const db = client.db("inventory");
    const collection = db.collection(number);

    await collection.updateOne(
      {}, // only one document per collection
      { $set: { [`orders.${name}`]: { amount, status } } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
