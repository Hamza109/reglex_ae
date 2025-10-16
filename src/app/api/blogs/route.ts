import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuthUser } from "@/lib/server-auth";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
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

    if (!body.title || body.content_json === undefined) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: slug,
        content_json: body.content_json,
        content_html: body.content_html || "",
        thumbnail: body.thumbnail || null,
        status: body.status || "DRAFT",
        authorId: user.id, // Set from authenticated user
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
