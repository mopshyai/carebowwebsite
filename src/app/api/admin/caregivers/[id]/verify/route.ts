import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.type !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();

    const caregiver = await prisma.caregiverProfile.update({
      where: { id },
      data: {
        verificationStatus: status,
      },
      include: {
        user: true,
      },
    });

    // TODO: Send email notification to caregiver

    return NextResponse.json({ success: true, caregiver });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Failed to verify caregiver" }, { status: 500 });
  }
}
