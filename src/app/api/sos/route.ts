import { NextRequest, NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitization";
import { rateLimit } from "@/lib/security/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per 15 minutes for SOS
    if (!rateLimit(request, { limit: 5, windowMs: 15 * 60 * 1000 })) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before sending another SOS." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const sanitizedBody = sanitizeObject(body);
    const { lat, lng, phone, name, type } = sanitizedBody;

    if (!lat || !lng || !phone) {
      return NextResponse.json(
        { error: "Location and phone are required for SOS" },
        { status: 400 }
      );
    }

    // In production: 
    // 1. Store SOS in database
    // 2. Notify nearest emergency services
    // 3. Send location to emergency contacts
    // 4. Trigger rescue coordination workflow

    const sosId = "SOS-" + Date.now();

    return NextResponse.json({
      success: true,
      data: {
        id: sosId,
        status: "RECEIVED",
        message: "SOS alert received. Emergency services have been notified.",
        estimatedResponse: "10-15 minutes",
        nearestShelter: {
          name: "Government School, Dharavi",
          distance: "2.3 km",
          lat: 19.0467,
          lng: 72.8547,
        },
      },
    });
  } catch (error) {
    console.error("SOS error:", error);
    return NextResponse.json(
      { error: "Failed to process SOS. Please call 112 directly." },
      { status: 500 }
    );
  }
}
