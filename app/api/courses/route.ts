import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        userId: session.user.id,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
