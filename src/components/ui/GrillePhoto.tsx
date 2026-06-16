interface GrillePhotoProps {
  zone: number; // 1–12, left-to-right top-to-bottom in a 4×3 grid
  className?: string;
  overlay?: number; // 0–1
  children?: React.ReactNode;
}

const COLS = 4;
const ROWS = 3;

export default function GrillePhoto({ zone, className = "", overlay = 0, children }: GrillePhotoProps) {
  const idx = Math.max(1, Math.min(12, zone)) - 1;
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  const x = Math.round((col / (COLS - 1)) * 100);
  const y = Math.round((row / (ROWS - 1)) * 100);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: "url('/images/grille.png')",
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${x}% ${y}%`,
      }}
    >
      {overlay > 0 && (
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(10,22,40,${overlay})` }} />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
