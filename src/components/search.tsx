"use client";

import { useState } from "react";
import cards from "./../../python/cards.json";
import areas from "./../../python/areas.json";

type Props = {
  placeholder: string;
};

const MapCardSearchBar = ({ placeholder }: Props) => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const cardIds = Object.values(cards);

  let cleanSearch = search
    .toLowerCase()
    .trim()
    .replace("'", "")
    .replace(" ", "");

  let filteredData = cardIds.filter((card) => {
    let cleanCardName = card.name
      .toLowerCase()
      .trim()
      .replace("'", "")
      .replace(" ", ""); // Add this as some sort of Alias in the cards.json
    return cleanCardName.includes(cleanSearch);
  });

  return (
    <div className="w-60">
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />
      </div>
      {filteredData.length < 6 && filteredData.length > 0 && isFocused ? (
        <div
          id="dropdown-menu"
          className="relative right-0 mt-2 space-y-1 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {filteredData.map((card) => (
            <div key={card.art_url}>{card.name}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MapCardSearchBar;
