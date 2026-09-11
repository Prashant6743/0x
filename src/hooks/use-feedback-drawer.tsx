import { createContext, useContext, useState, type ReactNode } from "react";

type FeedbackDrawerCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const FeedbackDrawerContext = createContext<FeedbackDrawerCtx | null>(null);

export function FeedbackDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FeedbackDrawerContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </FeedbackDrawerContext.Provider>
  );
}

export function useFeedbackDrawer() {
  const ctx = useContext(FeedbackDrawerContext);
  if (!ctx) throw new Error("useFeedbackDrawer must be used inside FeedbackDrawerProvider");
  return ctx;
}
