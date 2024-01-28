import React from "react";
import { DivCard } from "~/consts/CardsData";

type Props = {
  card: DivCard;
  className?: string;
};

const DivCardDisplay = ({ card, className }: Props) => {
  return (
    <div className={`poe-font relative block h-[668px] w-[440px] ${className}`}>
      <div className="absolute left-[26px] top-[56px] block h-[280px] w-[390px] overflow-hidden bg-black">
        <img
          className="select-none"
          src={card.art_url}
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
        {card.stack_size}
      </div>
      <div className="text-l absolute left-[35px] top-[334px] flex h-[302px] w-[374px] flex-col justify-evenly text-center text-xl text-white">
        <div className="order-1 whitespace-pre-wrap">
          {card.reward_text.map((rewardText) => (
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
