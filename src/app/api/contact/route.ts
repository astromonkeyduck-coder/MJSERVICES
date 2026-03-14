import { NextRequest, NextResponse } from "next/server";

const TARGET_EMAIL = "mr.pangolinman@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email, and service are required." },
        { status: 400 }
      );
    }

    const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || "Not provided",
        service,
        message: message || "No message",
        _subject: `MJ Concierge - ${service} inquiry from ${name}`,
        _replyto: email,
        _template: "table",
        _autoresponse: `Hi ${name}, thank you for reaching out to MJ Concierge Services! We received your ${service} inquiry and will get back to you within 24 hours. - MJ Concierge Services, Orlando FL`,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Formsubmit error:", res.status, data);
      return NextResponse.json(
        { error: "Failed to send. Please try calling us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try calling us directly." },
      { status: 500 }
    );
  }
}
