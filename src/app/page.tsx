import DivCardTable from "~/components/divCardTable";
import MapCardSearchBar from "~/components/mapCardSearchBar";

export default async function HomePage() {
  return (
    <div className="flex min-h-0 w-full flex-col items-center justify-center space-y-12 py-12">
      <MapCardSearchBar placeholder="Search for Map or Card" />
      <DivCardTable />
    </div>
  );
}
