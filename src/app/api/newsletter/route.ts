import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });

    const sent = await sendEmail({
      subject: "Nouvelle inscription newsletter",
      html: emailTemplate("Nouvelle inscription newsletter", { Email: email }),
    });
    if (!sent) {
      return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
