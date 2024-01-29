import DivCardTable from "~/components/divCardTable";
import MapCardSearchBar from "~/components/mapCardSearchBar";

export default async function HomePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-12 p-12">
      <MapCardSearchBar placeholder="Search for Map or Card" />
      <DivCardTable />
    </div>
  );
}
