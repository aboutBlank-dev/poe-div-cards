"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { DivCard } from "~/consts/CardsData";
import cardsData from "./../../python/cards.json";
import chaosIcon from "public/chaos.png";
import divineIcon from "public/divine.png";
import DivCardDisplay from "./divCardDisplay";
import Link from "next/link";
import PathHelper from "~/app/helpers/pathHelper";

type Props = {};

const DivCardTable = (props: Props) => {
  const tableEntries: TableEntry[] = useMemo(() => {
    const sortedCards = Object.values(cardsData).sort((a, b) => {
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
  }, [cardsData]);

  return (
    <div className="relative mt-4 overflow-x-auto rounded-lg border-2 border-gray-600 bg-gray-800 shadow-md">
      <table className="table w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead className="border-b bg-gray-900 text-xs uppercase text-white">
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
                className="group border-b last:border-none"
              >
                <td className="px-6 py-4 font-bold text-white">
                  <Link
                    href={PathHelper.getCardPath(entry.card.id)}
                    className="hover:underline"
                  >
                    {entry.card.name}
                  </Link>
                </td>
                <td className="flex items-center space-x-2 px-6 py-4 font-bold text-white">
                  <Image
                    src={entry.priceType == "chaos" ? chaosIcon : divineIcon}
                    alt={entry.priceType}
                    className="h-8 w-auto"
                  />
                  <p>{entry.priceValue}</p>
                </td>
                <td className="p-0">
                  <DivCardDisplay
                    card={entry.card}
                    className="hidden -translate-y-32 translate-x-4 group-hover:absolute group-hover:block"
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
