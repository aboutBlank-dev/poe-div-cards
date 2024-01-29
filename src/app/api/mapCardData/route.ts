import fetchCardMapData from "~/server/fetchCardMapData";

export async function GET(request: Request) {
  const cardMapData = await fetchCardMapData();
  return new Response(JSON.stringify(cardMapData));
}
