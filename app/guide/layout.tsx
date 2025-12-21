"use client";
import SidebarGuide from "@/components/SidebarGuide";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import type React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRoleGuard({ allowedRoles: ["GUIDE"], redirectTo: "/" });
  {
    return (
      <div className="bg-background flex min-h-screen flex-col">
        <div className="flex flex-1">
          <SidebarGuide />
          <main className="bg-background flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    );
  }
}
