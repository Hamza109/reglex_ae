import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuthUser } from "@/lib/server-auth";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const user = getServerAuthUser(req);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (!body.name || !body.company || !body.message) {
      return new NextResponse(
        "Missing required fields (name, company, message)",
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        company: body.company,
        message: body.message,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
