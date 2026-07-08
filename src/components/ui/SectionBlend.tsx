// Zone de transition STATIQUE entre deux sections de couleurs différentes.
// Dégradé vertical pur CSS (aucune animation) qui fond la couleur de la section
// du haut vers celle du bas, pour un enchaînement fluide au scroll.
export default function SectionBlend({
  from,
  to,
  height = 100,
}: {
  from: string;
  to: string;
  height?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
