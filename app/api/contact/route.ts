import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, 1000).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const company = sanitize(body.company);
    const role = sanitize(body.role);
    const type = sanitize(body.type);
    const phone = sanitize(body.phone);
    const revenue = sanitize(body.revenue);
    const stage = sanitize(body.stage);
    const linkedin = sanitize(body.linkedin);
    const message = sanitize(body.message);

    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { error: "Name, email, company and role are required." },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const submission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: type || "enterprise",
      name,
      email,
      company,
      role,
      ...(phone && { phone }),
      ...(revenue && { revenue }),
      ...(stage && { stage }),
      ...(linkedin && { linkedin }),
      ...(message && { message }),
      submittedAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "submissions.json");

    await mkdir(dataDir, { recursive: true });

    let submissions: unknown[] = [];
    try {
      const existing = await readFile(filePath, "utf-8");
      const parsed = JSON.parse(existing);
      if (Array.isArray(parsed)) submissions = parsed;
    } catch {
    }

    submissions.push(submission);
    await writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
