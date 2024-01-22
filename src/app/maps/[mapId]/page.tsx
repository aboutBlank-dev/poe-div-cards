"use client";

import React from "react";
import { MapsData } from "~/consts/MapsData";

type Props = {
  params: { mapId: string };
};

const MapsPage = ({ params }: Props) => {
  const map = MapsData[params.mapId];

  if (!map) {
    return <div>Map not found</div>;
  }

  return <div>{map.name}</div>;
};

export default MapsPage;
