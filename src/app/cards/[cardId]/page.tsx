"use client";

import React from "react";
import DivCardDisplay from "~/components/divCardDisplay";
import { CardsData, DivCard } from "~/consts/CardsData";

type Props = {
  params: { cardId: string };
};

const CardPage = ({ params }: Props) => {
  const card: DivCard | undefined = CardsData[params.cardId];

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <DivCardDisplay card={card} />
    </div>
  );
};

export default CardPage;
