import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const client = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    await client.connect();
    const db = client.db("inventory");
    const collection = db.collection("orders");

    const allData = await collection.find().toArray();

    return NextResponse.json({ success: true, allData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, message: error.message });
  } finally {
    await client.close();
  }
}
