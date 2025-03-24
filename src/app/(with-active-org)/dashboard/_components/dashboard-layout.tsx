import { PropsWithChildren } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/general/sidebar/app-sidebar"
import { FormDeleteModal } from "@/components/general/modals/form-delete-modal"
import { CreateFormModal } from "@/components/general/modals/create-form-modal"

interface DashboardLayoutProps extends PropsWithChildren {}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full bg-white">
        <div className="flex min-h-screen">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
