"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { CardsData, DivCard } from "~/consts/CardsData";
import chaosIcon from "public/chaos.png";
import divineIcon from "public/divine.png";
import DivCardDisplay from "./divCardDisplay";
import Link from "next/link";
import PathHelper from "~/app/helpers/pathHelper";

type Props = {
  cardsList?: DivCard[];
  className?: string;
};

const DivCardTable = ({ cardsList, className }: Props) => {
  if (!cardsList) {
    cardsList = Object.values(CardsData);
  }

  const tableEntries: TableEntry[] = useMemo(() => {
    if (!cardsList) {
      return [];
    }

    const sortedCards = cardsList.sort((a, b) => {
      return b.chaos_value - a.chaos_value;
    });

    return sortedCards.map((card) => {
      const useDivine = card.chaos_value > 215;
      return {
        card: card,
        priceValue: useDivine ? card.divine_value : card.chaos_value,
        priceType: useDivine ? "divine" : "chaos",
      };
    });
  }, [cardsList]);

  return (
    <div
      className={`relative overflow-auto rounded-lg border-2 border-gray-600 shadow-md ${className}`}
    >
      <table className="table w-full select-none rounded-lg text-left text-sm text-gray-500">
        <thead className="sticky top-0 border-b-2 bg-gray-900 text-center text-xs uppercase text-white">
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
                className="group border-b-2 last:border-none"
              >
                <td className="px-6 py-2 font-bold text-white">
                  <Link
                    href={PathHelper.getCardPath(entry.card.id)}
                    className="hover:underline"
                  >
                    {entry.card.name}
                  </Link>
                </td>
                <td className="flex items-center space-x-2 px-6 py-2 text-center font-bold text-white">
                  <Image
                    src={entry.priceType == "chaos" ? chaosIcon : divineIcon}
                    alt={entry.priceType}
                    className="h-8 w-auto"
                  />
                  <p>{entry.priceValue}</p>
                </td>
                <td className="relative p-0">
                  <DivCardDisplay
                    card={entry.card}
                    className="left-[50%] top-[50%] hidden -translate-y-1/2 translate-x-1/2 group-hover:fixed group-hover:block"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DivCardTable;

type TableEntry = {
  card: DivCard;
  priceValue: number;
  priceType: PriceType;
};

type PriceType = "chaos" | "divine";
