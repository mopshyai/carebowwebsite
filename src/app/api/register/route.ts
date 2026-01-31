import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name, type } = await req.json();

    // Validation
    if (!email || !password || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        type,
        emailVerified: new Date(), // Auto-verify for MVP (remove in production)
      },
    });

    // For MVP, we'll skip email verification
    // In production, send verification email here

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. You can now login.",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
