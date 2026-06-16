import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightRequestForm from "@/components/vols-prives/FlightRequestForm";

export default function VolsPrivesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-navy min-h-screen">
        <Suspense fallback={<div className="min-h-screen bg-navy" />}>
          <FlightRequestForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
