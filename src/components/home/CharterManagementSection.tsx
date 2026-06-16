"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CharterManagementSection() {
  return (
    <section className="py-[100px] bg-white" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            CHARTER MANAGEMENT
          </p>
          <h2 className="font-serif mb-5" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0A1628", lineHeight: 1.15 }}>
            Votre jet travaille pour vous.
          </h2>
          <p className="font-sans mb-8" style={{ fontSize: "15px", color: "#666666", lineHeight: 1.8 }}>
            Propriétaire ou investisseur, mettez votre appareil en exploitation commerciale et générez des revenus pendant vos absences. Notre équipe gère tout.
          </p>
          <Link
            href="/charter-management"
            className="btn-lift inline-block font-sans uppercase"
            style={{
              padding: "12px 28px",
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              border: "1px solid #0A1628",
              color: "#0A1628",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0A1628";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#0A1628";
            }}
          >
            En savoir plus
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
