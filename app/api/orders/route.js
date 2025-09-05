import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const ordersWaleBhiya = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    await ordersWaleBhiya.connect();

    const db = ordersWaleBhiya.db("inventory");
    const collection = db.collection("orders");

    const data = await request.json();
    await collection.insertOne(data);

    const allData = await collection.find().toArray();

    return NextResponse.json({ success: true, allData }); // Next response is a class of (server)--> a library of nextjs handling server side functions.
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json({ success: false });
  }
}
