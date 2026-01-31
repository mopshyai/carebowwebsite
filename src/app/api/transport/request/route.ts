import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get family profile
    const familyProfile = await prisma.familyProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!familyProfile) {
      return NextResponse.json({ error: "Family profile not found" }, { status: 404 });
    }

    const data = await request.json();
    const { pickupAddress, dropoffAddress, pickupTime, transportType, specialRequirements } = data;

    const transportBooking = await prisma.transportBooking.create({
      data: {
        familyId: familyProfile.id,
        userId: session.user.id!,
        transportType: transportType || "REGULAR",
        pickupAddress,
        dropoffAddress,
        pickupTime: new Date(pickupTime),
        specialRequirements,
        status: "REQUESTED",
      },
    });

    // TODO: Send notification to admin/transport team

    return NextResponse.json({ success: true, booking: transportBooking });
  } catch (error) {
    console.error("Transport request error:", error);
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get family profile
    const familyProfile = await prisma.familyProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!familyProfile) {
      return NextResponse.json({ success: true, bookings: [] });
    }

    const bookings = await prisma.transportBooking.findMany({
      where: {
        familyId: familyProfile.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch transport bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
