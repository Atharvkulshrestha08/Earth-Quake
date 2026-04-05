import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sanitizeObject } from "@/lib/security/sanitization";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const severity = searchParams.get("severity");
    const region = searchParams.get("region");

    const where: Record<string, unknown> = {
      isActive: true,
    };

    if (type) {
      where.type = type;
    }

    if (severity) {
      where.severity = { gte: parseInt(severity) };
    }

    const alerts = await db.alert.findMany({
      where,
      orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
      take: 50,
      include: {
        region: {
          select: {
            name: true,
            state: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: alerts,
      meta: {
        total: alerts.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Fetch alerts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      type,
      severity,
      title,
      description,
      lat,
      lng,
      radius,
      eta,
      expiresAt,
      regionId,
      organizationId,
    } = body;

    const alert = await db.alert.create({
      data: {
        type,
        severity,
        title,
        description,
        lat,
        lng,
        radius: radius || 50,
        eta: eta ? new Date(eta) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        regionId,
        organizationId,
        isVerified: true,
        createdById: "system",
      },
    });

    await db.auditLog.create({
      data: {
        action: "alert.created",
        resource: "alert",
        resourceId: alert.id,
        metadata: { type, severity, title },
      },
    });

    return NextResponse.json({
      success: true,
      data: alert,
    });
  } catch (error) {
    console.error("Create alert error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
