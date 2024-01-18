export const metadata = {
  title: "Active cadets",
  description: "Display 42Bangkok's cadets list"
};

export default function ActiveCadetsRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
