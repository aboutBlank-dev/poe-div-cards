import React from "react";
import { DivCard } from "~/consts/CardsData";

type Props = {
  card: DivCard;
};

const DivCardDisplay = ({ card }: Props) => {
  return (
    <span className="poe-font relative block h-[668px] w-[440px]">
      <span className="absolute left-[26px] top-[56px] block h-[280px] w-[390px] overflow-hidden bg-black">
        <img
          className="select-none"
          src={card.art_url}
          alt="card"
          width={396}
          height={284}
        />
      </span>
      <span className="absolute left-0 top-0 block h-full w-full bg-div-card-bg"></span>
      <span className="absolute top-[22px] block w-full text-center text-xl">
        {card.name}
      </span>
      <span className="absolute left-[42px] top-[316px] block w-[70px] text-center text-white">
        {card.stack_size}
      </span>
      <span className="text-l absolute left-[35px] top-[334px] flex h-[302px] w-[374px] flex-col justify-evenly text-center text-xl text-white">
        <span className="order-1 whitespace-pre-wrap">
          {card.reward_text.map((rewardText) => (
            <span key={rewardText.text} className={rewardText.tag}>
              {rewardText.text}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};

export default DivCardDisplay;
