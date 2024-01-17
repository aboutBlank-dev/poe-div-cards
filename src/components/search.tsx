"use client";

import { useState } from "react";
import cardsData from "./../../python/cards.json";
import areasData from "./../../python/areas.json";

type Props = {
  placeholder: string;
};

const MapCardSearchBar = ({ placeholder }: Props) => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const cards = Object.values(cardsData);
  const areas = Object.values(areasData);

  let cleanSearch = search
    .toLowerCase()
    .trim()
    .replace("'", "")
    .replace(" ", "");

  const searchResults: SearchResult[] = [];

  let filteredCards = cards.filter((card) => {
    let cleanCardName = card.name
      .toLowerCase()
      .trim()
      .replace("'", "")
      .replace(" ", ""); // Add this as some sort of Alias in the cards.json
    return cleanCardName.includes(cleanSearch);
  });

  let filteredAreas = areas.filter((area) => {
    let cleanAreaName = area.name
      .toLowerCase()
      .trim()
      .replace("'", "")
      .replace(" ", ""); // Add this as some sort of Alias in the cards.json
    return cleanAreaName.includes(cleanSearch);
  });

  filteredCards.forEach((card) => {
    searchResults.push({
      id: card.id,
      name: card.name,
      type: SearchResultType.Card,
    });
  });

  filteredAreas.forEach((area) => {
    searchResults.push({
      id: area.id,
      name: area.name,
      type: SearchResultType.Area,
    });
  });

  return (
    <div
      className={
        "transition-all duration-200 ease-in-out " +
        (isFocused ? "w-72" : "w-60")
      }
    >
      <label
        htmlFor="div-map-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900"
      >
        Search
      </label>
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 placeholder:text-center  focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {searchResults.length < 6 && searchResults.length > 0 && isFocused ? (
        <div
          id="dropdown-menu"
          className="relative right-0 mt-2 space-y-1 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {searchResults.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MapCardSearchBar;

type SearchResult = {
  id: string;
  name: string;
  type: SearchResultType;
};

enum SearchResultType {
  Card,
  Area,
}
