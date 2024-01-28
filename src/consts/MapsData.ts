import mapsData from "../../python/maps.json";

type MapsDataType = {
  [key: string]: AtlasMap;
};

export type AtlasMap = {
  id: string;
  name: string;
  unique: boolean;
  alias: string;
  cards: string[];
};

export const MapsData: MapsDataType = mapsData;
