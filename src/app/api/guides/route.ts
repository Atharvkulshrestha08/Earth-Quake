import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    const guides = await db.survivalGuide.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      success: true,
      data: guides,
    });
  } catch (error) {
    console.error("Fetch guides error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
