import React from "react";
import DivCardTable from "~/components/divCardTable";

export default async function HomePage() {
  return (
    <div className="flex min-h-0 w-full flex-col items-center justify-center space-y-12 py-12">
      <DivCardTable />
    </div>
  );
}
