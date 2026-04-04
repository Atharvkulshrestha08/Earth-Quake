import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { generateOtp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, email, language, location, consent } = parsed.data;

    const existingUser = await db.resident.findUnique({
      where: { phone },
    });

    if (existingUser?.isVerified) {
      return NextResponse.json(
        { error: "Phone number already registered" },
        { status: 400 }
      );
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.otpVerification.upsert({
      where: { phone },
      update: {
        otp,
        expiresAt,
        createdAt: new Date(),
      },
      create: {
        phone,
        email,
        otp,
        expiresAt,
      },
    });

    console.log(`[DEV] OTP for ${phone}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
