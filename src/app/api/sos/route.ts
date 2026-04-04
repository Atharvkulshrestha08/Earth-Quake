import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lng, phone, name, type } = body;

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
