"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isWaitlistOpen: boolean;
  selectedPlan: string;
  openWaitlist: (plan?: string) => void;
  closeWaitlist: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isWaitlistOpen: false,
  selectedPlan: "",
  openWaitlist: () => {},
  closeWaitlist: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const openWaitlist = (plan = "") => {
    setSelectedPlan(plan);
    setIsWaitlistOpen(true);
  };

  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <ModalContext.Provider value={{ isWaitlistOpen, selectedPlan, openWaitlist, closeWaitlist }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
