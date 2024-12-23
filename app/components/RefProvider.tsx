"use client";
import { createContext, useContext, RefObject, useRef } from "react";

type RefContextType = {
  globalRef: RefObject<HTMLDivElement | null>;
};

const RefContext = createContext<RefContextType | undefined>(undefined);

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const globalRef: RefContextType = {
    globalRef: useRef<HTMLDivElement | null>(null),
  };
  return (
    <RefContext.Provider value={globalRef}>{children}</RefContext.Provider>
  );
};

export const useRefContext = () => useContext(RefContext);
