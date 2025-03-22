import { PropsWithChildren } from "react"
import { SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "../shared/sidebar/app-sidebar"

interface DashboardLayoutProps extends PropsWithChildren {}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full bg-white">
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
