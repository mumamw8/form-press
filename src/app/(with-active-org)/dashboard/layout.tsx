import { PropsWithChildren } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { CreateFormModal } from "@/components/app-form/create-form-modal"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

interface LayoutProps extends PropsWithChildren {}

export default async function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
  return (
    <SidebarProvider>
      <>
        <AppSidebar />
        {children}
        <CreateFormModal />
      </>
    </SidebarProvider>
  )
}
