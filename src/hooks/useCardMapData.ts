import { useEffect, useState } from "react";
import type { CardMapData } from "~/server/fetchCardMapData";

export const useCardMapData = () => {
  const [cardMapData, setCardMapData] = useState<CardMapData | null>(null);

  useEffect(() => {
    fetch("/api/mapCardData")
      .then((response) => response.json())
      .then((data) => {
        setCardMapData(data as CardMapData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return cardMapData;
};
