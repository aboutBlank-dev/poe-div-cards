"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { CardMapData } from "~/fetchCardMapData";

// const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const DAY_IN_MILLISECONDS = 1000 * 2;

type CardMapContext = {
  cardMapData: CardMapData | null;
  error: Error | null;
  isLoading: boolean;
};

const CardMapContext = createContext<CardMapContext>({
  cardMapData: null,
  error: null,
  isLoading: true,
});

interface CardMapContextProviderProps {
  children: React.ReactNode;
}

export function CardMapContextProvider({
  children,
}: CardMapContextProviderProps) {
  const [cardMapData, setCardMapData] = useState<CardMapData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/api/mapCardData", { next: { revalidate: DAY_IN_MILLISECONDS } })
      .then((res) => res.json())
      .then((cardMapData) => {
        setCardMapData(cardMapData as CardMapData);
      })
      .catch((error: Error) => {
        setError(error);
      });
  }, []);

  if (error) {
    //Since the application is basically broken/useless without the card map data, we throw an error here
    throw error;
  }

  return (
    <CardMapContext.Provider
      value={{ cardMapData: cardMapData, error: error, isLoading: false }}
    >
      {children}
    </CardMapContext.Provider>
  );
}

export function useCardMapData() {
  const context = useContext(CardMapContext);
  if (context === undefined) {
    throw new Error("useCardMapData must be used within a CardMapContext");
  }
  return context;
}
