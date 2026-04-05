import { NextRequest, NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitization";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const radius = parseInt(searchParams.get("radius") || "50");

    // In production, query from database with geospatial filter
    const shelters = [
      {
        id: "1",
        name: "Government School, Dharavi",
        address: "Dharavi Road, Sion, Mumbai - 400017",
        lat: 19.0467,
        lng: 72.8547,
        capacity: 500,
        occupied: 312,
        status: "OPEN",
        amenities: ["wifi", "power", "medical", "water"],
        distance: "2.3 km",
      },
      {
        id: "2",
        name: "Community Hall, Andheri",
        address: "Andheri West, Mumbai - 400058",
        lat: 19.1136,
        lng: 72.8697,
        capacity: 300,
        occupied: 245,
        status: "OPEN",
        amenities: ["wifi", "power", "water"],
        distance: "5.1 km",
      },
      {
        id: "3",
        name: "Sports Complex, Borivali",
        address: "Borivali East, Mumbai - 400066",
        lat: 19.2288,
        lng: 72.8582,
        capacity: 1000,
        occupied: 980,
        status: "FULL",
        amenities: ["wifi", "power", "medical", "water", "food"],
        distance: "12.4 km",
      },
    ];

    return NextResponse.json({
      success: true,
      data: shelters,
      meta: {
        total: shelters.length,
        nearestLat: lat,
        nearestLng: lng,
        radius: radius,
      },
    });
  } catch (error) {
    console.error("Shelters fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
