import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, plan } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    await sendEmail({
      subject: `Inscription liste d'attente — ${plan || "Non précisé"}`,
      html: emailTemplate("Nouvelle inscription liste d'attente", {
        "Prénom": firstName || "—",
        "Email": email,
        "Formule sélectionnée": plan || "—",
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
