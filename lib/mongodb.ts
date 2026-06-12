// lib/mongodb.ts - Updated for MongoDB Atlas
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log("🔍 MONGODB_URI loaded:", MONGODB_URI ? "✅ Found" : "❌ Missing");
console.log(
  "🔍 MONGODB_URI value:",
  MONGODB_URI ? MONGODB_URI.replace(/:([^@]+)@/, ":****@") : "undefined",
); // hides password

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  console.log("📡 dbConnect() called");
  console.log(
    "📡 Cache state — conn:",
    cached.conn ? "✅ exists" : "❌ null",
    "| promise:",
    cached.promise ? "✅ exists" : "❌ null",
  );

  if (cached.conn) {
    console.log("✅ Returning existing connection from cache");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 No existing promise, creating new connection...");

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    console.log("⚙️ Connection options:", opts);

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB Atlas successfully!");
        console.log("✅ DB name:", mongoose.connection.name);
        console.log("✅ Host:", mongoose.connection.host);
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Atlas connection error:", error.message);
        console.error("❌ Error code:", error.code);
        console.error("❌ Full error:", error);
        cached.promise = null;
        throw error;
      });
  } else {
    console.log("⏳ Reusing existing connection promise...");
  }

  try {
    console.log("⏳ Awaiting connection promise...");
    cached.conn = await cached.promise;
    console.log("✅ Connection established and cached");
  } catch (e) {
    console.error("❌ Failed to establish connection:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
