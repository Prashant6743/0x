import { createContext, useContext, useState, type ReactNode } from "react";

type ReviewDrawerCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ReviewDrawerContext = createContext<ReviewDrawerCtx | null>(null);

export function ReviewDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ReviewDrawerContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </ReviewDrawerContext.Provider>
  );
}

export function useReviewDrawer() {
  const ctx = useContext(ReviewDrawerContext);
  if (!ctx) throw new Error("useReviewDrawer must be used inside ReviewDrawerProvider");
  return ctx;
}
