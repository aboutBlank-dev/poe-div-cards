"use client";

import React from "react";
import DivCardTable from "~/components/divCardTable";
import Image from "next/image";
import MapIcon from "public/Map.png";
import UniqueMapIcon from "public/UniqueMap.png";
import type { DivCard } from "~/types/CardsData";
import LoadingSpinner from "~/components/loadingSpinner";
import { useCardMapData } from "~/contexts/cardMapContext";

type Props = {
  params: { mapId: string };
};

const MapsPage = ({ params }: Props) => {
  const { cardMapData } = useCardMapData();
  const map = cardMapData?.mapsData[params.mapId];

  if (!map) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner size={100} />
      </div>
    );
  }

  const cards: DivCard[] = [];
  for (const cardId of map.cards) {
    const card = cardMapData.cardsData[cardId];
    if (card) {
      cards.push(card);
    }
  }

  return (
    <div className="flex min-h-0 w-full flex-col items-center justify-center space-y-4 p-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-center text-2xl text-white">{map.name}</h1>
        <Image
          src={map.unique ? UniqueMapIcon : MapIcon}
          alt={map.unique ? "Unique Map" : "Map"}
        />
      </div>
      <DivCardTable cardsList={cards} />
    </div>
  );
};

export default MapsPage;
