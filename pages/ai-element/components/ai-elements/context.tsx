import React from "react";

export const AIElementsContext = React.createContext<
  { variant?: string } | undefined
>(undefined);

export type AIElementsProviderProps = {
  children: React.ReactNode;
  variant?: string;
};

export function AIElementsProvider({
  children,
  variant,
}: AIElementsProviderProps) {
  return (
    <AIElementsContext.Provider value={{ variant }}>
      {children}
    </AIElementsContext.Provider>
  );
}

export function useAIElements() {
  const ctx = React.useContext(AIElementsContext);
  return ctx || {};
}
