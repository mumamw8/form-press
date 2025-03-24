import { PropsWithChildren } from "react"
import { DashboardLayout } from "@/app/(with-active-org)/dashboard/_components/dashboard-layout"
import { CreateFormModal } from "@/components/general/modals/create-form-modal"

interface LayoutProps extends PropsWithChildren {}

export default async function Layout({ children }: LayoutProps) {
  return (
    <DashboardLayout>
      {children}
      <CreateFormModal />
    </DashboardLayout>
  )
}
