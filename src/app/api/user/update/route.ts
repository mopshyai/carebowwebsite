import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, phone, address, bio, hourlyRate, specializations } = await request.json();

    // Update user
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
      },
    });

    // Update profile based on user type
    if (session.user.type === "FAMILY" && address) {
      await prisma.familyProfile.update({
        where: { userId: session.user.id },
        data: {
          address,
        },
      });
    } else if (session.user.type === "CAREGIVER") {
      const caregiverProfile = await prisma.caregiverProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (caregiverProfile) {
        await prisma.caregiverProfile.update({
          where: { id: caregiverProfile.id },
          data: {
            ...(bio && { bio }),
            ...(hourlyRate && { hourlyRate: parseFloat(hourlyRate) }),
            ...(specializations && { specializations }),
          },
        });
      }
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
