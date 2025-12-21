import BaseSidebar from "./BaseSidebar";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/users", label: "Users", icon: "users" },
  {
    href: "/admin/guide-application",
    label: "Guide Apply",
    icon: "guideApply",
  },
  {
    href: "/admin/package-types",
    label: "Package Types",
    icon: "packageTypes",
  },
  { href: "/admin/packages", label: "Packages", icon: "packages" },
  { href: "/admin/bookings", label: "Bookings", icon: "bookings" },
  { href: "/admin/profile", label: "Profile", icon: "profile" },
] as const;

export default function AdminSidebar() {
  return <BaseSidebar role="Admin" navItems={adminNav} />;
}
