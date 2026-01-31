import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Create new booking
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { caregiverId, startDate, endDate, bookingType, serviceAddress, requirements, hours } = data;

    // Get family profile
    const familyProfile = await prisma.familyProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!familyProfile) {
      return NextResponse.json({ error: "Family profile not found" }, { status: 404 });
    }

    // Get caregiver hourly rate
    const caregiver = await prisma.caregiverProfile.findUnique({
      where: { id: caregiverId },
    });

    if (!caregiver) {
      return NextResponse.json({ error: "Caregiver not found" }, { status: 404 });
    }

    const totalAmount = hours ? Number(caregiver.hourlyRate) * hours : Number(caregiver.hourlyRate);

    const booking = await prisma.booking.create({
      data: {
        familyId: familyProfile.id,
        caregiverId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        bookingType: bookingType || "HOURLY",
        serviceAddress: serviceAddress || familyProfile.address || "",
        requirements,
        hours,
        totalAmount,
        status: "PENDING",
      },
      include: {
        caregiver: {
          include: {
            user: true,
          },
        },
      },
    });

    // TODO: Send email notification to caregiver

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

// Get all bookings for current user
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let bookings;

    if (session.user.type === "FAMILY") {
      const familyProfile = await prisma.familyProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!familyProfile) {
        return NextResponse.json({ success: true, bookings: [] });
      }

      bookings = await prisma.booking.findMany({
        where: { familyId: familyProfile.id },
        include: {
          caregiver: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (session.user.type === "CAREGIVER") {
      const caregiverProfile = await prisma.caregiverProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!caregiverProfile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
      }

      bookings = await prisma.booking.findMany({
        where: { caregiverId: caregiverProfile.id },
        include: {
          family: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Admin - get all bookings
      bookings = await prisma.booking.findMany({
        include: {
          family: {
            include: {
              user: true,
            },
          },
          caregiver: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
