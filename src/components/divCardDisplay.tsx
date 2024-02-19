import React from "react";
import type { DivCard } from "~/types/CardsData";
import Image from "next/image";

type Props = {
  card: DivCard;
  className?: string;
};

const DivCardDisplay = ({ card, className }: Props) => {
  const onCardClicked = () => {
    window.open("https://www.poewiki.net/wiki/" + card.name.replace(" ", "_"));
  };

  return (
    <div
      className={`poe-font relative aspect-[440/668] max-h-[668px] max-w-[440px] select-none hover:cursor-pointer ${className}`}
      onClick={onCardClicked}
    >
      <div className="absolute left-[5.9%] top-[8%] block h-[41%] w-[90%] overflow-hidden bg-black">
        <Image
          className="select-none object-cover"
          src={card.artUrl}
          alt="card"
          width={396}
          height={284}
        />
      </div>
      <div className="absolute block h-full w-full bg-div-card-bg bg-contain bg-no-repeat" />
      <div className="color-[#030301] absolute left-[12%] top-[2%] flex h-[6.4%] w-[75%] items-center justify-center">
        {card.name}
      </div>
      <div className="absolute left-[9.5%] top-[46.6%] flex h-[5.3%] w-[16%] items-center justify-center text-center text-white">
        {card.stackSize}
      </div>
      <div className="absolute left-[8%] top-[51%] flex h-[45%] w-[85%] flex-col justify-evenly text-center text-white">
        <div className="order-1 whitespace-pre-wrap">
          {card.rewardText?.map((rewardText) => (
            <div key={rewardText.text} className={rewardText.tag}>
              {rewardText.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DivCardDisplay;
