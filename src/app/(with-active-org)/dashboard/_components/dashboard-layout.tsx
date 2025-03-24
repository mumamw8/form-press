import { PropsWithChildren } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/general/sidebar/app-sidebar"

interface DashboardLayoutProps extends PropsWithChildren {}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full bg-white">
        <div className="flex min-h-screen">
          <AppSidebar />
          <SidebarInset className="w-full">{children}</SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
