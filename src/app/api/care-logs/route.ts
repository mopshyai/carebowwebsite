import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.type !== "CAREGIVER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      bookingId,
      notes,
      bloodPressure,
      heartRate,
      temperature,
      oxygenLevel,
      medications,
      activities,
      attachments,
    } = await request.json();

    // Verify caregiver owns this booking
    const caregiverProfile = await prisma.caregiverProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!caregiverProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Verify booking belongs to this caregiver
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        caregiverId: caregiverProfile.id,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 404 });
    }

    const careLog = await prisma.careLog.create({
      data: {
        bookingId,
        caregiverId: caregiverProfile.id,
        notes,
        bloodPressure,
        heartRate,
        temperature,
        oxygenLevel,
        medications,
        activities,
        attachments: attachments || [],
      },
      include: {
        booking: {
          include: {
            family: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, careLog });
  } catch (error) {
    console.error("Care log creation error:", error);
    return NextResponse.json({ error: "Failed to create care log" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let careLogs;

    if (session.user.type === "CAREGIVER") {
      const caregiverProfile = await prisma.caregiverProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!caregiverProfile) {
        return NextResponse.json({ success: true, careLogs: [] });
      }

      careLogs = await prisma.careLog.findMany({
        where: {
          booking: {
            caregiverId: caregiverProfile.id,
          },
        },
        include: {
          booking: {
            include: {
              family: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (session.user.type === "FAMILY") {
      const familyProfile = await prisma.familyProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!familyProfile) {
        return NextResponse.json({ success: true, careLogs: [] });
      }

      careLogs = await prisma.careLog.findMany({
        where: {
          booking: {
            familyId: familyProfile.id,
          },
        },
        include: {
          booking: {
            include: {
              caregiver: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Admin
      careLogs = await prisma.careLog.findMany({
        include: {
          booking: {
            include: {
              family: { include: { user: true } },
              caregiver: { include: { user: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, careLogs });
  } catch (error) {
    console.error("Fetch care logs error:", error);
    return NextResponse.json({ error: "Failed to fetch care logs" }, { status: 500 });
  }
}
