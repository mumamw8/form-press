import {
  AppBreadcrumbList,
  BreadcrumbListItem,
} from "@/components/app-breadcrumb-list"
import { DashboardPage } from "@/components/dashboard-page"
import React from "react"

const breadcrumbs: BreadcrumbListItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "forms", href: "/dashboard/forms" },
]

export default function Page() {
  return <DashboardPage title="Forms" breadcrumbs={breadcrumbs}></DashboardPage>
}
