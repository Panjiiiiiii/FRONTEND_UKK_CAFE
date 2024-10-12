import SideNavbar from "@/components/NavManajer";

export const metadata = {
  title: "Manajer Page",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <SideNavbar>{children}</SideNavbar>
    </div>
  );
}
