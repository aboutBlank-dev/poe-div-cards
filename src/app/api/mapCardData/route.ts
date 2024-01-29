import fetchCardMapData from "~/server/fetchCardMapData";

export async function GET() {
  const cardMapData = await fetchCardMapData();
  return new Response(JSON.stringify(cardMapData));
}
