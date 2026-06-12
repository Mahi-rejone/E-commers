import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contacts";

const N8N_WEBHOOK_URL =
  "https://mahirejone.app.n8n.cloud/webhook-test/432bb754-9631-472d-8301-e52de1ca2860";

// GET handler - to fetch messages
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

// POST handler - to create new messages
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 },
      );
    }

    // Save to MongoDB
    const contact = await Contact.create({
      email,
      message,
      status: "pending",
    });

    console.log("✅ Message saved to MongoDB:", contact._id);

    // Trigger n8n webhook
    try {
      console.log("📡 Triggering n8n webhook...");
      const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          messageId: contact._id.toString(),
          createdAt: contact.createdAt,
        }),
      });

      if (webhookResponse.ok) {
        console.log("✅ n8n webhook triggered successfully");
      } else {
        console.warn("⚠️ n8n webhook responded with:", webhookResponse.status);
      }
    } catch (webhookError) {
      // Don't fail the whole request if n8n is down
      console.error("❌ Failed to trigger n8n webhook:", webhookError);
    }

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 },
    );
  }
}
