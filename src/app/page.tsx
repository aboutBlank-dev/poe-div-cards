import MapCardSearchBar from "~/components/search";
import cardsData from "./../../python/cards.json";
import mapsData from "./../../python/maps.json";
import chaosIcon from "./../../public/chaos.png";
import divineIcon from "./../../public/divine.png";
import Image from "next/image";
import { useMemo } from "react";

export default function HomePage() {
  const tableEntries: TableEntry[] = useMemo(() => {
    const sortedCards = Object.values(cardsData).sort((a, b) => {
      return b.chaos_value - a.chaos_value;
    });

    return sortedCards.map((card) => {
      const useDivine = card.chaos_value > 215;
      return {
        name: card.name,
        priceValue: useDivine ? card.divine_value : card.chaos_value,
        priceType: useDivine ? "divine" : "chaos",
      };
    });
  }, [cardsData]);

  return (
    <div className="flex w-full justify-center">
      <div className="mt-8 flex max-w-5xl flex-col items-center">
        <MapCardSearchBar
          cardsData={cardsData}
          mapsData={mapsData}
          placeholder="Search for Map or Card"
        />
        <div className="relative mt-4 overflow-x-auto rounded-lg border-2 border-gray-600 bg-gray-800 shadow-md">
          <table className="table w-full text-left text-sm text-gray-500 rtl:text-right">
            <thead className="border-b bg-gray-900 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {tableEntries.map((entry) => {
                return (
                  <tr key={entry.name} className="border-b">
                    <td className="px-6 py-4 font-bold text-white">
                      {entry.name}
                    </td>
                    <td className="flex items-center space-x-2 px-6 py-4 font-bold text-white">
                      <Image
                        src={
                          entry.priceType == "chaos" ? chaosIcon : divineIcon
                        }
                        alt={entry.priceType}
                        className="h-8 w-auto"
                      />
                      <p>{entry.priceValue}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type TableEntry = {
  name: string;
  priceValue: number;
  priceType: PriceType;
};

type PriceType = "chaos" | "divine";
