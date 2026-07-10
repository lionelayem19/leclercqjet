import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, plan } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const sent = await sendEmail({
      subject: `Inscription liste d'attente — ${plan || "Non précisé"}`,
      html: emailTemplate("Nouvelle inscription liste d'attente", {
        "Prénom": firstName || "—",
        "Email": email,
        "Formule sélectionnée": plan || "—",
      }),
    });
    if (!sent) {
      return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
