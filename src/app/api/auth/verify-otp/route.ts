import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { otpVerifySchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = otpVerifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { phone, otp } = parsed.data;

    const otpRecord = await db.otpVerification.findUnique({
      where: { phone },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP not found. Please request a new one." },
        { status: 400 }
      );
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    await db.otpVerification.update({
      where: { phone },
      data: { verifiedAt: new Date() },
    });

    const resident = await db.resident.upsert({
      where: { phone },
      update: {
        isVerified: true,
        name: otpRecord.email ? undefined : undefined,
      },
      create: {
        phone,
        email: otpRecord.email || null,
        isVerified: true,
        consent: true,
        language: "en",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Phone verified successfully",
      residentId: resident.id,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
