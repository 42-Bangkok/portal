import "@/styles/globals.css";

export const metadata = {
  title: "42 Bangkok's Portal",
  description: "Login to 42 Bangkok's Portal"
};

export default function RootLayout({
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
