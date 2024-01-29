"use client";

import React from "react";
import { MapsData } from "~/consts/MapsData";
import { CardsData, DivCard } from "~/consts/CardsData";
import DivCardTable from "~/components/divCardTable";
import Image from "next/image";
import MapIcon from "public/Map.png";
import UniqueMapIcon from "public/UniqueMap.png";

type Props = {
  params: { mapId: string };
};

const MapsPage = ({ params }: Props) => {
  const map = MapsData[params.mapId];

  if (!map) {
    return <div>Map not found</div>;
  }

  const cards: DivCard[] = [];
  for (const cardId of map.cards) {
    const card = CardsData[cardId];
    if (card) {
      cards.push(card);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-12 p-12">
      <div className="flex items-center space-x-4">
        <h1 className="text-center text-2xl text-white">{map.name}</h1>
        <Image
          src={map.unique ? UniqueMapIcon : MapIcon}
          alt={map.unique ? "Unique Map" : "Map"}
        />
      </div>
      <DivCardTable cardsList={cards} />;
    </div>
  );
};

export default MapsPage;
