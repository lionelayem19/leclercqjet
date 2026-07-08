import type { ReactNode } from "react";

type Tone = "navy" | "beige";

// Sur-titre doré en lettres espacées, signature visuelle de toutes les sections.
//   - tone "navy"  → sur fond foncé, doré clair #C9A96E
//   - tone "beige" → sur fond clair, doré foncé #8B6F3F (meilleur contraste)
const COLOR: Record<Tone, string> = { navy: "#C9A96E", beige: "#8B6F3F" };

export default function SectionEyebrow({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <p
      className="font-sans uppercase"
      style={{
        fontSize: "11px",
        letterSpacing: "3px",
        fontWeight: 500,
        color: COLOR[tone],
        marginBottom: "14px",
      }}
    >
      {children}
    </p>
  );
}
