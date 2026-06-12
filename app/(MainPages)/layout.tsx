import Banner from "@/components/banner";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Banner></Banner>
      <Navbar></Navbar>
      <main className="min-h-screen">{children}</main>
      <p>Footer</p>
      <p>cart sidebar</p>
    </div>
  );
}
