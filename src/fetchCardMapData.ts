import type { CardsData } from "~/types/CardsData";
import type { MapsData } from "~/types/MapsData";

const POE_LEAGUE_API_URL = "https://api.pathofexile.com/leagues?";
const POE_WIKI_API_URL = "https://poewiki.net/w/api.php?";
const POE_NINJA_CARD_API_URL =
  "https://poe.ninja/api/data/itemoverview?type=DivinationCard&league=";

export type CardMapData = {
  cardsData: CardsData;
  mapsData: MapsData;
};

export default async function fetchCardMapData(): Promise<CardMapData> {
  const currentLeague = await fetchCurrentLeague();
  const wikiMapData = await fetchWikiMapData(currentLeague);
  const wikiAreaData = await fetchWikiAreaData();
  const wikiCardData = await fetchWikiCardData();
  const itemPriceData = await fetchNinjaCardData(currentLeague);

  //Build Map Data
  const mapsData: MapsData = {};
  for (const wikiMap of Object.values(wikiMapData)) {
    const mapId = wikiMap.title["area id"];
    let mapName = "";
    for (const wikiArea of Object.values(wikiAreaData)) {
      if (wikiArea.title.id === mapId) {
        mapName = wikiArea.title.name;
        break;
      }
    }

    mapsData[mapId] = {
      id: mapId,
      name: mapName,
      unique: mapId.toLowerCase().includes("unique"),
      alias: mapName.toLowerCase().replace(" ", "").replace("'", ""),
      cards: [],
    };
  }

  //Build Card Data
  const cardsData: CardsData = {};
  for (const wikiCard of Object.values(wikiCardData)) {
    const card = wikiCard.title;
    const cardName = card.name;

    //Unfortunately, the poe wiki doesn't have an id for div cards OR an image url, so we have to get it from somewhere else.
    const ninjaCard = itemPriceData.find(
      (item) => item.name.toLowerCase() === cardName.toLowerCase(),
    );
    if (!ninjaCard) continue;

    const cardId = ninjaCard.artFilename; //Use artFileName as an id

    const cardDropAreas = [];
    if (card["drop areas"] && card["drop areas"].length > 0) {
      const dropAreaIds = card["drop areas"].split(",");
      for (let dropAreaId of dropAreaIds) {
        dropAreaId = dropAreaId.trim();
        const map = mapsData[dropAreaId];
        if (map) {
          cardDropAreas.push(dropAreaId);
          map.cards.push(cardId);
        }
      }
    }

    if (cardDropAreas.length === 0) continue;

    const CARD_ART_URL_BASE = "https://web.poecdn.com/image/divination-card/";
    const rewardText = [];
    const explicitModifier = ninjaCard.explicitModifiers[0];
    if (explicitModifier && "text" in explicitModifier) {
      //remove all <size:xx> tags from explicit modifier
      const text = explicitModifier.text.replace(/<size:\d+>/g, "");

      //find all <tag>{content} and turn it into a list of tuples with tag and content
      const regex2 = /<(\w+)>([^<]+)/g;
      let match;
      while ((match = regex2.exec(text))) {
        if (!match[1] || !match[2]) continue;
        rewardText.push({
          tag: match[1],
          text: match[2].replaceAll("{", "").replaceAll("}", ""),
        });
      }
    }

    cardsData[cardId] = {
      id: cardId,
      name: cardName,
      dropAreas: cardDropAreas,
      stackSize: ninjaCard.stackSize,
      chaosValue: ninjaCard.chaosValue,
      divineValue: ninjaCard.divineValue,
      artUrl: CARD_ART_URL_BASE + cardId + ".png",
      alias: cardName.toLowerCase().replace(" ", "").replace("'", ""),
      rewardText: rewardText,
    };
  }
  return { cardsData, mapsData };
}

type LeagueData = {
  category: {
    id: string;
    name?: string;
    description?: string;
    current?: boolean;
  };
};

async function fetchCurrentLeague(): Promise<string> {
  const response = await fetch(
    POE_LEAGUE_API_URL +
      new URLSearchParams({ realm: "pc", type: "main" }).toString(),
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
      },
    },
  );

  const leagues = (await response.json()) as LeagueData[];
  let currentLeague = "";
  for (const league of Object.values(leagues)) {
    if (league.category && league.category.current === true) {
      currentLeague = league.category.id;
    }
  }

  return currentLeague;
}

type WikiMapData = {
  [key: string]: {
    title: {
      "area id": string;
    };
  };
};

async function fetchWikiMapData(currentLeague: string): Promise<WikiMapData> {
  const params = new URLSearchParams({
    action: "cargoquery",
    format: "json",
    limit: "500",
    tables: "maps",
    fields: "maps.area_id",
    where: `maps.series='${currentLeague}' AND maps.guild_character NOT LIKE '' AND maps.area_id NOT LIKE '%Synthesised%' AND maps.tier<=16`,
  });

  const response = await fetch(POE_WIKI_API_URL + params.toString());

  const wikiMapData = (await response.json()) as {
    cargoquery: WikiMapData;
  };

  return wikiMapData.cargoquery;
}

type WikiAreaData = {
  [key: string]: {
    title: {
      id: string;
      name: string;
    };
  };
};

async function fetchWikiAreaData(): Promise<WikiAreaData> {
  const params = new URLSearchParams({
    action: "cargoquery",
    format: "json",
    limit: "500",
    tables: "areas",
    fields: "areas.name, areas.id",
    where:
      "areas.id LIKE 'MapWorlds%' AND areas.is_legacy_map_area=false AND (areas.is_unique_map_area=true OR areas.is_map_area=true)",
  });

  const response = await fetch(POE_WIKI_API_URL + params.toString());

  const wikiAreaData = (await response.json()) as { cargoquery: WikiAreaData };

  return wikiAreaData.cargoquery;
}

type WikiCardData = {
  [key: string]: {
    title: {
      name: string;
      "drop areas": string;
    };
  };
};

async function fetchWikiCardData(): Promise<WikiCardData> {
  const params = new URLSearchParams({
    action: "cargoquery",
    format: "json",
    limit: "500",
    tables: "items",
    fields: "items.name, items.drop_areas, items.drop_text",
    where: `items.class_id="DivinationCard" AND items.drop_enabled="1"`,
  });

  const response = await fetch(POE_WIKI_API_URL + params.toString());

  const wikiCardData = (await response.json()) as { cargoquery: WikiCardData };
  return wikiCardData.cargoquery;
}

type NinjaCardData = {
  id: string;
  name: string;
  stackSize: number;
  artFilename: string;
  explicitModifiers: { text: string; optional: boolean }[];
  chaosValue: number;
  divineValue: number;
};

async function fetchNinjaCardData(
  currentLeague: string,
): Promise<NinjaCardData[]> {
  const response = await fetch(POE_NINJA_CARD_API_URL + currentLeague, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
    },
  });

  const itemPriceData = (await response.json()) as { lines: NinjaCardData[] };
  return itemPriceData.lines;
}
