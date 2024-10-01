import SideNavbar from "@/components/NavKasir";

export const metadata = {
  title: "Kasir Page",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <SideNavbar>{children}</SideNavbar>
    </div>
  );
}
