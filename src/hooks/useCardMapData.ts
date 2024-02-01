import { useEffect, useState } from "react";
import type { CardMapData } from "~/server/fetchCardMapData";

export const useCardMapData = () => {
  const [cardMapData, setCardMapData] = useState<CardMapData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/api/mapCardData")
      .then((res) => res.json())
      .then((cardMapData) => {
        setCardMapData(cardMapData as CardMapData);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return { cardMapData, error };
};
