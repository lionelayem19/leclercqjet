"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputType?: string;
}

export default function AirportInput({
  value,
  onChange,
  placeholder = "Ville ou aéroport",
  className = "",
}: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      className={className}
    />
  );
}
