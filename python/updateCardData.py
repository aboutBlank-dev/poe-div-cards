import json
import requests

URL = "https://www.poewiki.net/w/api.php"
POE_LEAGUE_URL = "https://api.pathofexile.com/leagues"
POE_NINJA_DIV_URL = "https://poe.ninja/api/data/itemoverview?type=DivinationCard&league="
CARD_ART_URL_BASE = "https://web.poecdn.com/image/divination-card/"

def get_card_data():
    current_leagues = requests.get(
        POE_LEAGUE_URL, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'},
        params={
            "realm": "pc",
            "type": "main",
        }).json()

    current_league = ""
    for league in current_leagues:
        if "current" in league["category"]:
            current_league = league["category"]["id"]
            break

    wiki_areas = requests.get(
        URL,
        params={
            "action": "cargoquery",
            "format": "json",
            "limit": "500",
            "tables": "areas",
            "fields": "areas.name, areas.id",
            "where": "areas.id LIKE 'MapWorlds%'",
        },
    ).json()["cargoquery"]

    areas = {}
    for area in wiki_areas:
        area = area["title"]
        name = area["id"]
        areas[name] = area["name"]

    wiki_cards = requests.get(
        URL,
        params={
            "action": "cargoquery",
            "format": "json",
            "limit": "500",
            "tables": "items",
            "fields": "items.name,items.drop_areas,items.drop_monsters,items.drop_text",
            "where": f'items.class_id="DivinationCard" AND items.drop_enabled="1"',
        },
    ).json()["cargoquery"]

    poe_ninja_prices = requests.get(POE_NINJA_DIV_URL + current_league).json()["lines"]

    cards = {}
    for card in wiki_cards:
        card = card["title"]
        name = card["name"]
        ninja_card = next(filter(lambda x: x["name"] == name, poe_ninja_prices))

        if ninja_card:
            card_art = ninja_card["artFilename"]
            drop_area_ids = card["drop areas"]
            drop_areas = {}

            if drop_area_ids:
                drop_area_ids = drop_area_ids.split(",")
                for drop_area in drop_area_ids:
                    drop_area_id = drop_area.strip()
                    if drop_area_id in areas:
                        drop_areas[drop_area_id] = areas[drop_area_id]

            if len(drop_areas) < 1:
                continue

            cards[name] = {
               "name": name,
               "drop_areas": drop_areas, 
               "chaos_value": ninja_card["chaosValue"],
               "divine_value": ninja_card["divineValue"],
               "art_url": CARD_ART_URL_BASE + card_art + ".png",
           } 


    #Write it into a json file 
    json_object = json.dumps(cards, indent=4)
    with open("cards.json", "w") as outfile:
        outfile.write(json_object)
    
get_card_data()