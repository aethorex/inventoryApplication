import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  // const ordersWaleBhiya = new MongoClient(
  //   "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/"
  // );

  // try {
  //   await ordersWaleBhiya.connect();

  //   const db = ordersWaleBhiya.db("inventory");
  //   const collection = db.collection("orders");

  //   const data = await request.json();

  //   await collection.updateOne(
  //     { _id: new ObjectId(data.itemID) },
  //     { $set: {status: data.status} }
  //   );

  //   return NextResponse.json({ success: true }); // Next response is a class of (server)--> a library of nextjs handling server side functions.
  // } catch (error) {
  //   console.error("Error parsing request:", error);
  //   return NextResponse.json({ success: false });
  // }

  console.log(await request.json())
}
