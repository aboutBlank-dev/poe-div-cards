"use client";

import React from "react";
import DivCardTable from "~/components/divCardTable";
import Image from "next/image";
import MapIcon from "public/Map.png";
import UniqueMapIcon from "public/UniqueMap.png";
import { useCardMapData } from "~/hooks/useCardMapData";
import type { DivCard } from "~/types/CardsData";

type Props = {
  params: { mapId: string };
};

const MapsPage = ({ params }: Props) => {
  const cardMapData = useCardMapData();
  const map = cardMapData?.mapsData[params.mapId];

  if (!map) {
    return <div>Map not found</div>;
  }

  const cards: DivCard[] = [];
  for (const cardId of map.cards) {
    const card = cardMapData.cardsData[cardId];
    if (card) {
      cards.push(card);
    }
  }

  return (
    <div className="flex min-h-0 w-full flex-col items-center justify-center space-y-12 py-12">
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
