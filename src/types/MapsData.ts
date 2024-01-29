export type MapsData = {
  [key: string]: AtlasMap;
};

export type AtlasMap = {
  id: string;
  name: string;
  unique: boolean;
  alias: string;
  cards: string[];
};
