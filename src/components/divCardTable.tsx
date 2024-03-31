"use client";

import React from "react";
import Image from "next/image";
import chaosIcon from "public/chaos.png";
import divineIcon from "public/divine.png";
import DivCardDisplay from "./divCardDisplay";
import Link from "next/link";
import PathHelper from "~/helpers/pathHelper";
import type { DivCard } from "~/types/CardsData";
import { useCardMapData } from "~/contexts/cardMapContext";
import test from "node:test";

type Props = {
  cardsList?: DivCard[];
  className?: string;
};

/*
 * @param cardsList - If provided, will use this list of cards to display. If not provided, will use the cardMapData context to display ALL cards.
 */
export default function DivCardTable({ cardsList, className }: Props) {
  const { cardMapData } = useCardMapData();
  if (!cardsList && cardMapData) {
    cardsList = Object.values(cardMapData.cardsData);
  }

  if (!cardsList) {
    return null;
  }

  const sortedCards = cardsList.sort((a, b) => {
    return b.chaosValue - a.chaosValue;
  });

  const tableEntries: TableEntry[] = [];
  sortedCards.map((card) => {
    //Show price as divine if it's at least 1 divine
    const useDivine = card.chaosValue > 215; //TODO: since this value can fluctuate, can attempt to also get the current market rate from POE Ninja and use it here.
    tableEntries.push({
      card: card,
      priceValue: useDivine ? card.divineValue : card.chaosValue,
      priceType: useDivine ? "divine" : "chaos",
    });
  });

  return (
    <div
      className={`relative overflow-auto rounded-lg border-2 border-darkBrown bg-beige shadow-2xl ${className}`}
    >
      <table className="table w-full select-none rounded-lg text-left text-sm text-white">
        <thead className="sticky top-0 border-b-2 border-darkBrown bg-lightBrown text-left text-xs uppercase text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Divination Card
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {tableEntries.map((entry) => {
            return (
              <tr
                key={entry.card.name}
                className="group border-b-2 border-darkBrown text-black last:border-none"
              >
                <td className="px-6 py-2 font-bold">
                  <Link
                    href={PathHelper.getCardPath(entry.card.id)}
                    className="hover:underline"
                  >
                    {entry.card.name}
                  </Link>
                </td>
                <td className="flex items-center space-x-2 px-6 py-2 text-center font-bold">
                  <Image
                    src={entry.priceType == "chaos" ? chaosIcon : divineIcon}
                    alt={entry.priceType}
                    className="h-8 w-auto"
                  />
                  <p>{entry.priceValue}</p>
                </td>
                <td className="relative hidden p-0 md:block">
                  <DivCardDisplay
                    card={entry.card}
                    className="left-[50%] top-[50%] hidden w-[400px] -translate-y-1/2 translate-x-1/2 text-xs group-hover:fixed group-hover:block md:text-xl"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type TableEntry = {
  card: DivCard;
  priceValue: number;
  priceType: PriceType;
};

type PriceType = "chaos" | "divine";
