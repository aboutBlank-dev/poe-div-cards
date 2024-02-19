import "~/styles/globals.css";
import Link from "next/link";
import { CardMapContextProvider } from "~/contexts/cardMapContext";

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
      <body className="flex h-screen w-full flex-col bg-slate-800">
        <header>
          <Link
            href="/"
            className="inline-block px-4 py-2 text-white underline"
          >
            Home
          </Link>
        </header>
        <CardMapContextProvider>{children}</CardMapContextProvider>
      </body>
    </html>
  );
}
