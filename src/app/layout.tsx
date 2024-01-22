import "~/styles/globals.css";

export const metadata = {
  title: "Poe Div Cards",
  description: "Find which divination cards can be found in which Path of Exile map",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800">{children}</body>
    </html>
  );
}
