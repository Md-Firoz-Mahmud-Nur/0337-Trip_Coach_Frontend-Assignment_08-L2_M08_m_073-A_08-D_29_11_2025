import type React from "react"
import UserSidebar from "@/components/SidebarUser"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1">
        <UserSidebar />
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
