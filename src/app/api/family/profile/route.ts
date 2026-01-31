import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Update user phone
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phone: data.phone,
      },
    });

    // Create family profile
    const profile = await prisma.familyProfile.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        emergencyContactName: data.emergencyContact,
        emergencyContactPhone: data.emergencyPhone,
        emergencyContactRelation: data.emergencyRelation,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const profile = await prisma.familyProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        familyMembers: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const profile = await prisma.familyProfile.update({
      where: { userId: session.user.id },
      data: {
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        emergencyContactName: data.emergencyContact,
        emergencyContactPhone: data.emergencyPhone,
        emergencyContactRelation: data.emergencyRelation,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
