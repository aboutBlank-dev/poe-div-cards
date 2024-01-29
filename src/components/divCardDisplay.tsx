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
      className={`poe-font relative block h-[668px] w-[440px] select-none hover:cursor-pointer ${className}`}
      onClick={onCardClicked}
    >
      <div className="absolute left-[26px] top-[56px] block h-[280px] w-[390px] overflow-hidden bg-black">
        <Image
          className="select-none"
          src={card.artUrl}
          alt="card"
          width={396}
          height={284}
        />
      </div>
      <div className="absolute left-0 top-0 block h-full w-full bg-div-card-bg" />
      <div className="color-[#030301] absolute top-[22px] block w-full text-center text-xl">
        {card.name}
      </div>
      <div className="absolute left-[42px] top-[316px] block w-[70px] text-center text-base text-white">
        {card.stackSize}
      </div>
      <div className="text-l absolute left-[35px] top-[334px] flex h-[302px] w-[374px] flex-col justify-evenly text-center text-xl text-white">
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
