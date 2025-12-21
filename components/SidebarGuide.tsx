import BaseSidebar from "./BaseSidebar";

const guideNav = [
  { href: "/guide/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/guide/packages", label: "Packages", icon: "packages" },
  { href: "/guide/profile", label: "Profile", icon: "profile" },
] as const;

export default function SidebarGuide() {
  return <BaseSidebar role="Guide" navItems={guideNav} />;
}
