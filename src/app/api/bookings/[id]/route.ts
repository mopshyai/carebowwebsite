import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: bookingId } = await params;
    const { action } = await request.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        caregiver: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check authorization
    if (session.user.type === "CAREGIVER") {
      const caregiverProfile = await prisma.caregiverProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (booking.caregiverId !== caregiverProfile?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    let updatedBooking;

    if (action === "accept") {
      updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
        include: {
          caregiver: {
            include: {
              user: true,
            },
          },
          family: {
            include: {
              user: true,
            },
          },
        },
      });
      // TODO: Send confirmation email
    } else if (action === "decline") {
      updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
        include: {
          caregiver: {
            include: {
              user: true,
            },
          },
          family: {
            include: {
              user: true,
            },
          },
        },
      });
      // TODO: Send cancellation email
    } else if (action === "complete") {
      updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED" },
      });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking deletion error:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
