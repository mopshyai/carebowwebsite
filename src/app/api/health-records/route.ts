import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const recordType = formData.get("recordType") as string;
    const memberName = formData.get("memberName") as string;
    const description = formData.get("description") as string | null;
    const recordDate = formData.get("recordDate") as string;

    // Create database record
    const familyProfile = await prisma.familyProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!familyProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    let fileUrl = null;

    if (file) {
      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), "public", "uploads", "health-records");
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch {
        // Directory may already exist
      }

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
      fileUrl = `/uploads/health-records/${fileName}`;
    }

    const record = await prisma.healthRecord.create({
      data: {
        familyId: familyProfile.id,
        title,
        recordType,
        memberName,
        description,
        fileUrl,
        recordDate: recordDate ? new Date(recordDate) : new Date(),
      },
    });

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error("Health record upload error:", error);
    return NextResponse.json({ error: "Failed to upload record" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.type !== "FAMILY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const familyProfile = await prisma.familyProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!familyProfile) {
      return NextResponse.json({ success: true, records: [] });
    }

    const records = await prisma.healthRecord.findMany({
      where: { familyId: familyProfile.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error("Fetch records error:", error);
    return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
  }
}
