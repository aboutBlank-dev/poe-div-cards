"use client";

import React from "react";
import { CardsData } from "~/consts/CardsData";

type Props = {
  params: { cardId: string };
};

const CardPage = ({ params }: Props) => {
  const card = CardsData[params.cardId];
  console.log(params.cardId);

  if (!card) {
    return <div>Card not found</div>;
  }

  return <div>{card.name}</div>;
};

export default CardPage;
