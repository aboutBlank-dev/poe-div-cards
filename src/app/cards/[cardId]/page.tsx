"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import PathHelper from "~/app/helpers/pathHelper";
import DivCardDisplay from "~/components/divCardDisplay";
import { CardsData, DivCard } from "~/consts/CardsData";
import { AtlasMap, MapsData } from "~/consts/MapsData";
import MapIcon from "public/Map.png";
import UniqueMapIcon from "public/UniqueMap.png";

type Props = {
  params: { cardId: string };
};

const CardPage = ({ params }: Props) => {
  const card: DivCard | undefined = CardsData[params.cardId];

  if (!card) {
    return <div>Card not found</div>;
  }

  const dropAreas: AtlasMap[] = [];
  for (const map of card.drop_areas) {
    const mapData = MapsData[map];
    if (mapData) dropAreas.push(mapData);
  }

  return (
    <div className="flex h-screen items-center justify-center space-x-32 px-12 py-12">
      <div className="relative max-h-[650px] overflow-y-auto rounded-lg border-2 border-gray-600 bg-gray-800 shadow-md">
        <table className="table select-none text-gray-500 ">
          <thead className="sticky top-0 rounded-lg border-b-2 bg-gray-900 text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Drops From Maps
              </th>
            </tr>
          </thead>
          <tbody className="">
            {dropAreas.map((entry) => {
              return (
                <tr key={entry.id} className="border-b-2 last:border-none">
                  <td className="flex items-center justify-between space-x-8 px-6 py-2 text-white">
                    <Link
                      href={PathHelper.getMapPath(entry.id)}
                      className="hover:underline"
                    >
                      {entry.name}
                    </Link>
                    <Image
                      src={entry.unique ? UniqueMapIcon : MapIcon}
                      alt={entry.unique ? "Unique Map" : "Map"}
                      className="h-8 w-auto"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DivCardDisplay card={card} />
    </div>
  );
};

export default CardPage;
