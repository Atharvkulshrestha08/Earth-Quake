import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // In production, validate against database
    // For now, simulate a successful login with demo credentials
    if (email === "admin@earthquake.gov.in" && password === "admin1234") {
      return NextResponse.json({
        success: true,
        data: {
          id: "admin-001",
          email: email,
          name: "Admin User",
          role: "ADMIN",
          token: "demo-jwt-token-" + Date.now(),
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
