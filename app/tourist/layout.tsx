"use client";
import SidebarTourist from "@/components/SidebarTourist";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import type React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useRoleGuard({
    allowedRoles: ["TOURIST"],
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!isAuthenticated) {
    return null;
  }
  {
    return (
      <div className="bg-background flex min-h-screen flex-col">
        <div className="flex flex-1">
          <SidebarTourist />
          <main className="bg-background flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    );
  }
}
