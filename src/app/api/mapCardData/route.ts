import fetchCardMapData from "~/fetchCardMapData";

export async function GET() {
  const cardMapData = await fetchCardMapData();
  return Response.json(cardMapData);
}
