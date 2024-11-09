import Navbar from "@/components/app/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {children}
    </div>
  );
}
