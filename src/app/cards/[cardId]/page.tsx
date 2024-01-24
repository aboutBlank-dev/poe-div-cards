"use client";

import React from "react";
import DivCard from "~/components/divCard";
import { CardsData } from "~/consts/CardsData";

type Props = {
  params: { cardId: string };
};

const CardPage = ({ params }: Props) => {
  const card = CardsData[params.cardId];

  if (!card) {
    return <div>Card not found</div>;
  }
  const rewardText = card.reward_text[0]?.text;

  return (
    <DivCard
      cardName={card.name}
      stackSize={card.stack_size}
      rewardText={rewardText ?? ""}
      image={card.art_url}
    ></DivCard>
  );
};

export default CardPage;
