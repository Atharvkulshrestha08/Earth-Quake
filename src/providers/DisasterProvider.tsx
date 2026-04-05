"use client";

import * as React from "react";

type DisasterStatus = "NORMAL" | "WARNING" | "CRITICAL";

interface DisasterContextType {
  status: DisasterStatus;
  setStatus: (status: DisasterStatus) => void;
  lastAlert: string | null;
  setLastAlert: (alert: string | null) => void;
}

const DisasterContext = React.createContext<DisasterContextType | undefined>(undefined);

export function DisasterProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = React.useState<DisasterStatus>("NORMAL");
  const [lastAlert, setLastAlert] = React.useState<string | null>(null);

  // Auto-reset WARNING/CRITICAL after some time (simulated)
  React.useEffect(() => {
    if (status !== "NORMAL") {
      const timer = setTimeout(() => {
        // setStatus("NORMAL"); 
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <DisasterContext.Provider value={{ status, setStatus, lastAlert, setLastAlert }}>
      {children}
    </DisasterContext.Provider>
  );
}

export function useDisaster() {
  const context = React.useContext(DisasterContext);
  if (context === undefined) {
    throw new Error("useDisaster must be used within a DisasterProvider");
  }
  return context;
}
