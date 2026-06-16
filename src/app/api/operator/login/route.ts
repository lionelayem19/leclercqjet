import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const validEmail = process.env.OPERATOR_EMAIL || "admin@leclercqjet.com";
    const validPass = process.env.OPERATOR_PASSWORD || "LeclercqJet2024!";
    const token = process.env.OPERATOR_TOKEN || "lj-secure-token-2024";

    if (email === validEmail && password === validPass) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("operator-token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      return res;
    }

    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("operator-token");
  return res;
}
