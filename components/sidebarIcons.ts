import {
  Bookmark,
  Box,
  LayoutDashboard,
  Package,
  User,
  UserRoundPlus,
  Users,
} from "lucide-react";

export const sidebarIcons = {
  dashboard: LayoutDashboard,
  bookings: Bookmark,
  profile: User,
  packages: Package,
  users: Users,
  guideApply: UserRoundPlus,
  packageTypes: Box,
} as const;

export type SidebarIconKey = keyof typeof sidebarIcons;
