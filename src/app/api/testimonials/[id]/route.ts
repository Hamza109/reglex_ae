import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuthUser } from "@/lib/server-auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(resolvedParams.id) },
    });

    if (!testimonial) {
      return new NextResponse("Testimonial not found", { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = getServerAuthUser(req);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resolvedParams = await params;
    const body = await req.json();

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        name: body.name,
        company: body.company,
        message: body.message,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = getServerAuthUser(req);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resolvedParams = await params;
    await prisma.testimonial.delete({
      where: { id: parseInt(resolvedParams.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
