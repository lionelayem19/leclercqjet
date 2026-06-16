interface LogoMarkProps {
  className?: string;
}

export default function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ textDecoration: "none" }}>
      <span
        className="font-serif italic text-white leading-none"
        style={{ fontSize: "30px", fontWeight: 600, textDecoration: "none" }}
      >
        Leclercq&apos;Jet
      </span>
      <span
        className="font-sans text-gold uppercase block mt-1"
        style={{ fontSize: "9px", letterSpacing: "0.45em", textDecoration: "none" }}
      >
        International
      </span>
      <div className="w-full mt-1" style={{ height: "1px", backgroundColor: "#C9A96E" }} />
    </div>
  );
}
