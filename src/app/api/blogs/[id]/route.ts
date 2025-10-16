import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuthUser } from "@/lib/server-auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(resolvedParams.id) },
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

    if (!blog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
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

    // Check if user owns the blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(resolvedParams.id) },
    });

    if (!existingBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    if (existingBlog.authorId !== user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const blog = await prisma.blog.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        title: body.title,
        content_json: body.content_json,
        content_html: body.content_html || "",
        thumbnail: body.thumbnail || null,
        status: body.status || "DRAFT",
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
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
    // Check if user owns the blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(resolvedParams.id) },
    });

    if (!existingBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    if (existingBlog.authorId !== user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.blog.delete({
      where: { id: parseInt(resolvedParams.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
