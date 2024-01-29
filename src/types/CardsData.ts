export type CardsData = {
  [key: string]: DivCard;
};

export type DivCard = {
  id: string;
  name: string;
  dropAreas: string[];
  stackSize: number;
  rewardText?: { tag: string; text: string }[];
  chaosValue: number;
  divineValue: number;
  artUrl: string;
  alias: string;
};
