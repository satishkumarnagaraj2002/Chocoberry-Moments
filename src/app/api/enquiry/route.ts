import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/validation";

export const runtime = "nodejs";

const windowMs = 10 * 60 * 1000;
const maxRequests = 5;
const requests = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) return NextResponse.json({ ok: false, code: "payload_too_large" }, { status: 413 });

  const now = Date.now();
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  for (const [key, value] of requests) if (value.resetAt <= now) requests.delete(key);
  const limit = requests.get(clientKey);
  if (limit && limit.count >= maxRequests && limit.resetAt > now) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - now) / 1000)) } });
  }
  requests.set(clientKey, limit && limit.resetAt > now ? { ...limit, count: limit.count + 1 } : { count: 1, resetAt: now + windowMs });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }
  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ ok: false, code: "invalid_enquiry", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.companyWebsite) return NextResponse.json({ ok: true }, { status: 202 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to) return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });

  const enquiry = parsed.data;
  const text = [
    "New Chocoberry Moments event enquiry",
    "",
    `Event: ${enquiry.eventType}`,
    `Date: ${enquiry.eventDate}`,
    `Preferred time: ${enquiry.serviceTime}`,
    `Location: ${enquiry.location}`,
    `Venue: ${enquiry.venue || "Not provided"}`,
    `Estimated guests: ${enquiry.guestCount}`,
    `Dessert interests: ${enquiry.experiences.join(", ")}`,
    `Additional requirements: ${enquiry.requirements || "Not provided"}`,
    "",
    `Name: ${enquiry.fullName}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Preferred contact method: ${enquiry.contactMethod}`,
    `Message: ${enquiry.message || "Not provided"}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, replyTo: enquiry.email, subject: `Event enquiry: ${enquiry.eventType} · ${enquiry.eventDate}`, text });
    if (error) return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}