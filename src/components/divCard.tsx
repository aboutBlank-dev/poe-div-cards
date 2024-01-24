import React from "react";

type Props = {
  cardName: string;
  image: string;
  stackSize: number;
  rewardText: string;
};

const DivCard = ({ image, stackSize, cardName, rewardText }: Props) => {
  //WRAP THIS IN A USE MEMO LATER WHICH ONLY CHANGES IF CARD CHANGES

  const strings = rewardText.split("\n");
  const rewardTexts: RewardText[] = [];

  for (let line of strings) {
    const tags = line.match(/(?<=<).+?(?=>)/g);
    const texts = line.match(/(?<={).+?(?=})/g);

    if (!texts || !tags) continue;
    if (texts.length === 0 || tags.length === 0) continue;

    const rewardText: RewardText = {
      text: texts ? texts[0] : line,
      cssClass: tags ? tags[0] : "",
    };

    if (texts.length > 1) {
      for (let i = 1; i < texts.length; i++) {
        const text = texts[i];
        if (!text || text.length === 0) continue;

        const tag = tags[i];
        if (!tag || tag.length === 0) continue;

        const childText: RewardText = {
          text: text,
          cssClass: tag,
        };
        rewardText.children = rewardText.children ?? [];
        rewardText.children.push(childText);
      }
    }
    rewardTexts.push(rewardText);
  }

  console.log(rewardTexts);

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
      <span className="text-l absolute left-[35px] top-[334px] flex h-[302px] w-[374px] flex-col justify-evenly text-center text-white">
        <span className="order-1 flex flex-col whitespace-pre-wrap">
          {rewardTexts.map((rewardText) => (
            <span key={rewardText.text} className={rewardText.cssClass}>
              {rewardText.text}
              {rewardText.children && (
                <span>
                  {rewardText.children.map((child) => (
                    <span key={child.text} className={child.cssClass + " ml-1"}>
                      {child.text}
                    </span>
                  ))}
                </span>
              )}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};

export default DivCard;

type RewardText = {
  text: string;
  cssClass: string;
  children?: RewardText[];
};
