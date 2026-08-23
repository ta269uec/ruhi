import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type LayoutMode = "auto" | "mobile" | "desktop";

const STORAGE_KEY = "ruhi:layout-mode";
const MODES: LayoutMode[] = ["auto", "mobile", "desktop"];

function loadMode(): LayoutMode {
  const v = localStorage.getItem(STORAGE_KEY);
  return v && (MODES as string[]).includes(v) ? (v as LayoutMode) : "auto";
}

interface LayoutModeState {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
}

const LayoutModeContext = createContext<LayoutModeState | null>(null);

export function LayoutModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LayoutMode>(loadMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  return <LayoutModeContext.Provider value={{ mode, setMode: setModeState }}>{children}</LayoutModeContext.Provider>;
}

export function useLayoutMode(): LayoutModeState {
  const ctx = useContext(LayoutModeContext);
  if (!ctx) throw new Error("useLayoutMode must be used within a LayoutModeProvider");
  return ctx;
}
