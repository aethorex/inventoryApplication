import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    const { number } = await request.json();

    if (!number) {
      return NextResponse.json({ success: false, error: "Number required" });
    }

    await client.connect();

    const db = client.db("inventory");
    const collection = db.collection(number);

    const document = await collection.findOne({});

    const products = document?.products || [];

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
