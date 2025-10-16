import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.email || !body.password) {
      return new NextResponse("Email and password are required", { status: 400 });
    }

    // Find author by email
    const author = await prisma.author.findUnique({
      where: { email: body.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        bio: true,
        avatar: true,
      }
    });

    if (!author) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(body.password, author.password);
    
    if (!isPasswordValid) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: author.id, 
        email: author.email,
        name: author.name 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return author data without password
    const { password, ...authorWithoutPassword } = author;

    return NextResponse.json({
      success: true,
      token,
      author: authorWithoutPassword
    });

  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
