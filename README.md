# Path of Exile Divination Card Helper
Find which divination cards are dropped in which **ATLAS** map and vice versa.

## Data is obtained from the following sources:
* [POE Wiki](https://www.poewiki.net/wiki/Path_of_Exile_Wiki:Data_query_API) via Cargo Query. (Item, Map, Zone)
* [POE Ninja](https://poe.ninja/) Item price information and Divination Card Art URL.
* [POE Official API](https://www.pathofexile.com/developer/docs) to get current league information.

Pricing data is refreshed every 24 Hours.

**TODO:** Improve performance by not having to rebuild data on client every time a new component needs it. (Eventhough nextJs caches the fetch results, the client still "rebuilds" the card/map metadata every time a new component needs it.)

### Screenshot
![image](https://github.com/aboutBlank-dev/poe-div-cards/assets/48128161/745373c7-8410-44d5-aa06-8acc2e7a5ab9)

Currently deployed at: https://poe-div-cards.vercel.app/
