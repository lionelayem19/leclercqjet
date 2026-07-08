import nodemailer from "nodemailer";

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface EmailPayload {
  subject: string;
  html: string;
}

export async function sendEmail({ subject, html }: EmailPayload): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("[Email] SMTP non configuré — email non envoyé:", subject);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"LECLERCQ'JET INTERNATIONAL" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "contact@leclercqjetinternational.com",
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("[Email] Erreur d'envoi:", err);
    return false;
  }
}

export function emailTemplate(title: string, rows: Record<string, string>): string {
  const rowsHtml = Object.entries(rows)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 16px;font-weight:600;color:#C0C8D4;width:180px;vertical-align:top;">${k}</td>
        <td style="padding:8px 16px;color:#E8EDF2;">${v}</td>
      </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="background:#0A1628;margin:0;padding:32px;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#0D1E35;border:1px solid rgba(192,200,212,0.15);border-radius:4px;overflow:hidden;">
        <div style="padding:32px;border-bottom:1px solid rgba(192,200,212,0.1);">
          <h1 style="color:#E8EDF2;font-family:Georgia,serif;font-size:24px;margin:0 0 4px;">${title}</h1>
          <p style="color:#C0C8D4;font-size:13px;margin:0;">LECLERCQ'JET INTERNATIONAL</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${rowsHtml}
        </table>
        <div style="padding:24px 16px;border-top:1px solid rgba(192,200,212,0.1);">
          <p style="color:#C0C8D4;font-size:12px;margin:0;">contact@leclercqjetinternational.com · +33 6 98 85 57 37</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
