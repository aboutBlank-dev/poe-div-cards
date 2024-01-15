import json
import requests

URL = "https://www.poewiki.net/w/api.php"
POE_NINJA_DIV_URL = "https://poe.ninja/api/data/itemoverview?type=DivinationCard&league=Affliction"
CARD_ART_URL_BASE = "https://web.poecdn.com/image/divination-card/"

def get_card_data():
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

    poe_ninja_prices = requests.get(POE_NINJA_DIV_URL).json()["lines"]

    cards = {}
    for card in wiki_cards:
        card = card["title"]
        name = card["name"]
        ninja_card = next(filter(lambda x: x["name"] == name, poe_ninja_prices))

        if ninja_card:
           card_art = ninja_card["artFilename"]
           cards[name] = {
               "name": name,
               "drop_areas": card["drop areas"],
               "drop_monsters": card["drop monsters"],
               "drop_text": card["drop text"],
               "chaos_value": ninja_card["chaosValue"],
               "divine_value": ninja_card["divineValue"],
               "art_url": CARD_ART_URL_BASE + card_art + ".png",
           } 


    #Write it into a json file 
    json_object = json.dumps(cards, indent=4)
    with open("cards.json", "w") as outfile:
        outfile.write(json_object)
    
get_card_data()