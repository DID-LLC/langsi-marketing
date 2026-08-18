export const metadata = {
  title: "Langsi",
  description: "Langsi Marketing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
