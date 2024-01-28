import DivCardTable from "~/components/divCardTable";
import MapCardSearchBar from "~/components/mapCardSearchBar";

export default function HomePage() {
  return (
    <div className="flex w-full justify-center">
      <div className="mt-8 flex max-w-5xl flex-col items-center">
        <MapCardSearchBar placeholder="Search for Map or Card" />
        <DivCardTable />
      </div>
    </div>
  );
}
