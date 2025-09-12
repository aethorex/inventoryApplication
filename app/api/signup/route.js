import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const loginWaleBhiya = new MongoClient(
    "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  );

  try {
    await loginWaleBhiya.connect();

    const db = loginWaleBhiya.db("inventory");
    const collection = db.collection("users");

    const data = await request.json();
    await collection.insertOne(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json({ success: false });
  }
}
