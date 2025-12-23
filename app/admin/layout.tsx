"use client";

import AdminSidebar from "@/components/SidebarAdmin";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import type React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useRoleGuard({ allowedRoles: ["ADMIN"] });

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
          <AdminSidebar />
          <main className="bg-background flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    );
  }
}
