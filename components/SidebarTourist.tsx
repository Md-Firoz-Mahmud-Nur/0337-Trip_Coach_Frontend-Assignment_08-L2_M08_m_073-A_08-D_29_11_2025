import BaseSidebar from "./BaseSidebar";

const touristNav = [
  { href: "/tourist/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/tourist/bookings", label: "My Bookings", icon: "bookings" },
  { href: "/tourist/profile", label: "Profile", icon: "profile" },
] as const;

export default function SidebarTourist() {
  return <BaseSidebar role="Tourist" navItems={touristNav} />;
}
