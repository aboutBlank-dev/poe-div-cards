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

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <DivCard
        cardName={card.name}
        stackSize={card.stack_size}
        rewardText={card.reward_text}
        image={card.art_url}
      />
    </div>
  );
};

export default CardPage;
