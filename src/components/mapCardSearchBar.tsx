"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DivCardIcon from "public/DivCard.png";
import MapIcon from "public/Map.png";
import UniqueMapIcon from "public/UniqueMap.png";
import Link from "next/link";
import PathHelper from "~/helpers/pathHelper";
import { useCardMapData } from "~/contexts/cardMapContext";

type SearchResult = {
  id: string;
  name: string;
  type: SearchResultType;
};

enum SearchResultType {
  Card = "Card",
  Map = "Map",
  UniqueMap = "Unique Map",
}

type Props = {
  placeholder: string;
};

const MapCardSearchBar = ({ placeholder }: Props) => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { cardMapData } = useCardMapData();

  const thisRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (thisRef.current && !thisRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [thisRef]);

  const cleanSearch = search
    .toLowerCase()
    .trim()
    .replace("'", "")
    .replace(" ", "");

  const searchResults: SearchResult[] = [];
  if (cardMapData?.cardsData && cardMapData.mapsData) {
    const cardsData = Object.values(cardMapData.cardsData);
    cardsData.forEach((card) => {
      if (card.alias.includes(cleanSearch)) {
        searchResults.push({
          id: card.id,
          name: card.name,
          type: SearchResultType.Card,
        });
      }
    });

    const mapsData = Object.values(cardMapData.mapsData);
    mapsData.forEach((map) => {
      if (!map.alias.includes(cleanSearch)) return;

      searchResults.push({
        id: map.id,
        name: map.name,
        type: map.unique ? SearchResultType.UniqueMap : SearchResultType.Map,
      });
    });
  }

  return (
    <div
      ref={thisRef}
      className={
        "relative transition-all duration-200 ease-in-out " +
        (isFocused ? "w-72" : "w-60")
      }
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-black "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="div-map-search"
          ref={inputRef}
          className="border-darkBrown bg-beige block w-full rounded-lg border-2 p-2 ps-10 text-sm text-gray-900 placeholder:text-center placeholder:text-zinc-500  focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {searchResults.length > 0 && searchResults.length < 50 && isFocused ? (
        <div
          id="dropdown-menu"
          className="absolute z-10 max-h-44 w-full overflow-auto rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {searchResults.map((result) => (
            <Link
              key={result.id}
              href={getPathForType(result)}
              onClick={() => {
                setIsFocused(false);
                setSearch("");
                inputRef.current!.value = "";
              }}
            >
              <div className="flex h-8 cursor-pointer rounded-md hover:bg-gray-300">
                <Image
                  src={getIconForType(result.type)}
                  alt={result.type}
                  className="w-auto p-1"
                />
                <p className="inline w-full select-none px-4 py-1 align-middle text-gray-700">
                  {result.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MapCardSearchBar;

function getIconForType(type: SearchResultType) {
  switch (type) {
    case SearchResultType.Card:
      return DivCardIcon;
    case SearchResultType.Map:
      return MapIcon;
    case SearchResultType.UniqueMap:
      return UniqueMapIcon;
  }
}

function getPathForType(searchResult: SearchResult) {
  switch (searchResult.type) {
    case SearchResultType.Card:
      return PathHelper.getCardPath(searchResult.id);
    default:
      return PathHelper.getMapPath(searchResult.id);
  }
}
