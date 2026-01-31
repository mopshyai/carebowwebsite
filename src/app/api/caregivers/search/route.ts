import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const city = searchParams.get("city");

    const caregivers = await prisma.caregiverProfile.findMany({
      where: {
        isActive: true,
        verificationStatus: "VERIFIED",
        ...(type && type !== "ALL" ? { caregiverType: type as any } : {}),
        ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        rating: "desc",
      },
      take: 50,
    });

    return NextResponse.json({ caregivers });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search caregivers" },
      { status: 500 }
    );
  }
}
