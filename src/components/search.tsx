"use client";

import { useEffect, useRef, useState } from "react";
import cardsData from "./../../python/cards.json";
import mapsData from "./../../python/maps.json";
import Image from "next/image";
import DivCardIcon from "./../../public/DivCard.png";
import MapIcon from "./../../public/Map.png";
import UniqueMapIcon from "./../../public/UniqueMap.png";

type Props = {
  placeholder: string;
};

const MapCardSearchBar = ({ placeholder }: Props) => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
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

  const cards = Object.values(cardsData);
  const maps = Object.values(mapsData);

  let cleanSearch = search
    .toLowerCase()
    .trim()
    .replace("'", "")
    .replace(" ", "");

  const searchResults: SearchResult[] = [];

  cards.forEach((card) => {
    if (!card.alias.includes(cleanSearch)) return;

    searchResults.push({
      id: card.id,
      name: card.name,
      type: SearchResultType.Card,
    });
  });

  maps.forEach((map) => {
    if (!map.alias.includes(cleanSearch)) return;

    searchResults.push({
      id: map.id,
      name: map.name,
      type: map.unique ? SearchResultType.UniqueMap : SearchResultType.Map,
    });
  });

  return (
    <div
      ref={thisRef}
      className={
        "transition-all duration-200 ease-in-out " +
        (isFocused ? "w-72" : "w-60")
      }
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 "
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 placeholder:text-center  focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {searchResults.length > 0 && searchResults.length < 50 && isFocused ? (
        <div
          id="dropdown-menu"
          className="relative right-0 max-h-44 overflow-auto rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex h-8 cursor-pointer rounded-md hover:bg-gray-300"
              onClick={() => {
                if (inputRef.current != null) {
                  inputRef.current.value = result.name;
                  setIsFocused(false);
                }
              }}
            >
              <Image
                src={getIconForType(result.type)}
                alt={result.type}
                className="w-auto p-1"
              />
              <a className="inline w-full select-none px-4 py-1 align-middle text-gray-700">
                {result.name}
              </a>
            </div>
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
