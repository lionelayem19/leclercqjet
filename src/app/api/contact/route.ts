import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    let subject = "";
    let rows: Record<string, string> = {};

    if (type === "vol") {
      subject = "Nouvelle demande de vol privé";
      rows = {
        "Départ": data.from || "—",
        "Arrivée": data.to || "—",
        "Date / Heure": data.dateTime || "—",
        "Passagers": data.passengers || "—",
        "Type de jet": data.jetType || "—",
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Message": data.message || "—",
      };
    } else if (type === "acquisition" || type === "jet") {
      subject = "Nouvelle demande d'acquisition jet privé";
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Budget indicatif": data.budget || "—",
        "Type d'appareil souhaité": data.type || data.aircraftType || "—",
        "Message": data.message || "—",
      };
    } else if (type === "contact") {
      subject = `Nouveau message — ${data.subject || "Contact"}`;
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Objet": data.subject || "—",
        "Message": data.message || "—",
      };
    } else if (type === "conciergerie") {
      subject = "Nouvelle demande de conciergerie";
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Message": data.message || "—",
      };
    } else if (type === "charter-management") {
      subject = "Nouvelle demande Charter Management";
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Type d'appareil": data.aircraft || "—",
        "Message": data.message || "—",
      };
    } else if (type === "gastronomie") {
      subject = "Nouvelle demande Gastronomie";
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Date du vol": data.flightDate || "—",
        "Nombre de passagers": data.passengers || "—",
        "Occasion": data.occasion || "—",
        "Préférences alimentaires": data.dietary || "—",
        "Message": data.message || "—",
      };
    } else if (type === "chauffeur") {
      subject = "Nouvelle demande Chauffeur Privé";
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Date du vol": data.date || "—",
        "Lieu de prise en charge": data.pickup || "—",
        "Destination": data.destination || "—",
        "Message": data.message || "—",
      };
    } else if (type === "animaux") {
      subject = "Nouvelle demande Animaux de compagnie";
      rows = {
        "Nom": data.name || "—",
        "Email": data.email || "—",
        "Téléphone": data.phone || "—",
        "Date du vol": data.date || "—",
        "Nombre d'animaux": data.pets || "—",
        "Race / Espèce": data.species || "—",
        "Besoins spéciaux": data.special || "—",
        "Message": data.message || "—",
      };
    } else {
      return NextResponse.json({ error: "Type inconnu" }, { status: 400 });
    }

    await sendEmail({ subject, html: emailTemplate(subject, rows) });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
