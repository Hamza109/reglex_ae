import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, phone, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.office365.com",
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT || 587),
      secure: false, // STARTTLS on 587
      requireTLS: true,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
      authMethod: "LOGIN",
      tls: { ciphers: "TLSv1.2" },
    });

    // Log a safe summary of transporter configuration (no secrets)
    console.log("[contact] transporter:", {
      host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.office365.com",
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      authMethod: "LOGIN",
      hasUser: !!process.env.NEXT_PUBLIC_SMTP_USER,
      hasPass: !!process.env.NEXT_PUBLIC_SMTP_PASS,
      from:
        process.env.NEXT_PUBLIC_MAIL_FROM || process.env.NEXT_PUBLIC_SMTP_USER,
      to:
        process.env.NEXT_PUBLIC_CONTACT_TO || process.env.NEXT_PUBLIC_SMTP_USER,
    });

    const html = `
      <h2>New Contact Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Company:</b> ${company || "-"}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Message:</b></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    console.log("smptp_user:", process.env.NEXT_PUBLIC_SMTP_USER);
    console.log("smptp_pass:", process.env.NEXT_PUBLIC_SMTP_PASS);
    console.log("mail_from:", process.env.NEXT_PUBLIC_MAIL_FROM);
    console.log("contact_to:", process.env.NEXT_PUBLIC_CONTACT_TO);

    await transporter.sendMail({
      from:
        process.env.NEXT_PUBLIC_MAIL_FROM || process.env.NEXT_PUBLIC_SMTP_USER,
      to:
        process.env.NEXT_PUBLIC_CONTACT_TO || process.env.NEXT_PUBLIC_SMTP_USER,
      subject: `Contact Us: ${name}`,
      replyTo: email,
      html,
    });

 

    return NextResponse.json({ ok: true });
  } catch (err) {

    console.error("contact api error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send" },
      { status: 500 }
    );
  }
}
