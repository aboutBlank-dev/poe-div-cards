import "~/styles/globals.css";
import Link from "next/link";
import { CardMapContextProvider } from "~/contexts/cardMapContext";
import MapCardSearchBar from "~/components/mapCardSearchBar";

export const metadata = {
  title: "Poe Div Cards",
  description:
    "Find which divination cards can be found in which Path of Exile map",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="fixed flex h-screen w-full flex-col bg-slate-800">
        <CardMapContextProvider>
          <header className="mt-8 flex items-center justify-center">
            <MapCardSearchBar placeholder="Search for Map or Card" />
          </header>
          {children}
        </CardMapContextProvider>
      </body>
    </html>
  );
}
