import cardsData from "./../../python/cards.json";

type CardsDataType = {
  [key: string]: {
    id: string;
    name: string;
    drop_areas: string[];
    stack_size: number;
    reward_text: { tag: string; text: string }[];
    chaos_value: number;
    divine_value: number;
    art_url: string;
    alias: string;
  };
};

export const CardsData: CardsDataType = cardsData;
