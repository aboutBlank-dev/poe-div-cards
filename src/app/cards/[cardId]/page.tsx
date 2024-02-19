"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import PathHelper from "~/helpers/pathHelper";
import DivCardDisplay from "~/components/divCardDisplay";
import MapIcon from "public/Map.png";
import UniqueMapIcon from "public/UniqueMap.png";
import type { DivCard } from "~/types/CardsData";
import type { AtlasMap } from "~/types/MapsData";
import LoadingSpinner from "~/components/loadingSpinner";
import { useCardMapData } from "~/contexts/cardMapContext";

type Props = {
  params: { cardId: string };
};

const CardPage = ({ params }: Props) => {
  const { cardMapData } = useCardMapData();
  const card: DivCard | undefined = cardMapData?.cardsData[params.cardId];

  if (!card)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner size={100} />
      </div>
    );

  // Get map data for each map id in each card 
  const dropAreas: AtlasMap[] = [];
  for (const map of card.dropAreas) {
    const mapData = cardMapData?.mapsData[map];
    if (mapData) dropAreas.push(mapData);
  }

  function CardPageTableRow(atlasMap: AtlasMap) {
    return (
      <tr
        key={atlasMap.id}
        className="border-darkBrown border-b-2 text-black last:border-none"
      >
        <td className="flex items-center justify-between space-x-8 px-6 py-2 font-bold">
          <Link
            href={PathHelper.getMapPath(atlasMap.id)}
            className="hover:underline"
          >
            {atlasMap.name}
          </Link>
          <Image
            src={atlasMap.unique ? UniqueMapIcon : MapIcon}
            alt={atlasMap.unique ? "Unique Map" : "Map"}
            className="h-8 w-auto"
          />
        </td>
      </tr>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center space-y-4 overflow-hidden p-6 md:flex-row md:justify-center md:space-x-32  ">
      <div className="inline-block w-[200px] md:w-[400px]">
        <DivCardDisplay card={card} className="text-xs md:text-xl" />
      </div>
      <div className="border-darkBrown bg-beige relative max-h-[650px] overflow-y-auto rounded-lg border-2 shadow-md">
        <table className="table select-none text-white">
          <thead className="bg-lightBrown border-darkBrown sticky top-0 rounded-lg border-b-2 text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Drops From Maps
              </th>
            </tr>
          </thead>
          <tbody>
            {dropAreas.map((atlasMap) => CardPageTableRow(atlasMap))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardPage;
