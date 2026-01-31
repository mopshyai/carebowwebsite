import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user.type !== "CAREGIVER") {
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

    // Create caregiver profile
    const profile = await prisma.caregiverProfile.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        caregiverType: data.caregiverType || "ELDER_CARE_SPECIALIST",
        bio: data.bio,
        experience: data.experience ? parseInt(data.experience) : 0,
        hourlyRate: data.hourlyRate ? parseFloat(data.hourlyRate) : 0,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        serviceRadius: data.serviceRadius ? parseInt(data.serviceRadius) : null,
        specializations: data.specialties
          ? data.specialties.split(",").map((s: string) => s.trim())
          : [],
        languages: data.languages || ["English"],
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

    if (!session || session.user.type !== "CAREGIVER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const profile = await prisma.caregiverProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        certifications: true,
        documents: true,
        availability: true,
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

    if (!session || session.user.type !== "CAREGIVER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const profile = await prisma.caregiverProfile.update({
      where: { userId: session.user.id },
      data: {
        bio: data.bio,
        experience: data.experience ? parseInt(data.experience) : undefined,
        hourlyRate: data.hourlyRate ? parseFloat(data.hourlyRate) : undefined,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        specializations: data.specializations,
        languages: data.languages,
        serviceRadius: data.serviceRadius ? parseInt(data.serviceRadius) : undefined,
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
