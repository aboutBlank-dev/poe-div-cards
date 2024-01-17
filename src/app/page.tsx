import MapCardSearchBar from "~/components/search";

export default function HomePage() {
  return (
    <div className="flex w-full justify-center">
      <div className="mt-8 max-w-5xl">
        <MapCardSearchBar placeholder="Search for Map or Card"></MapCardSearchBar>
      </div>
    </div>
  );
}
