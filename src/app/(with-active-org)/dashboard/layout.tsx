import { PropsWithChildren } from "react"
import { CreateFormModal } from "@/components/modals/create-form-modal"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

interface LayoutProps extends PropsWithChildren {}

export default async function Layout({ children }: LayoutProps) {
  return (
    <DashboardLayout>
      {children}
      <CreateFormModal />
    </DashboardLayout>
  )
}
