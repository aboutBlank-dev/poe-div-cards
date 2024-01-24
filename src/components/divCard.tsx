import React from "react";

type Props = {
  cardName: string;
  image: string;
  stackSize: number;
  rewardText: { tag: string; text: string }[];
};

const DivCard = ({ image, stackSize, cardName, rewardText }: Props) => {
  return (
    <span className="poe-font relative block h-[668px] w-[440px]">
      <span className="absolute left-[26px] top-[56px] block h-[280px] w-[390px] overflow-hidden">
        <img
          className="select-none"
          src={image}
          alt="card"
          width={396}
          height={284}
        />
      </span>
      <span className="bg-div-card-bg absolute left-0 top-0 block h-full w-full"></span>
      <span className="absolute top-[22px] block w-full text-center text-xl">
        {cardName}
      </span>
      <span className="absolute left-[42px] top-[316px] block w-[70px] text-center text-white">
        {stackSize}
      </span>
      <span className="text-l absolute left-[35px] top-[334px] flex h-[302px] w-[374px] flex-col justify-evenly text-center text-xl text-white">
        <span className="order-1 whitespace-pre-wrap">
          {rewardText.map((rewardText) => (
            <span key={rewardText.text} className={rewardText.tag}>
              {rewardText.text}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};

export default DivCard;
