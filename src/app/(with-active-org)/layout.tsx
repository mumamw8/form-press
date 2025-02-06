import { CreateFormModal } from "@/components/app-form/create-form-modal"
import { Navbar } from "@/components/navbar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OrganizationList } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { PropsWithChildren } from "react"

export default async function RequiredActiveOrgLayout({
  children,
}: PropsWithChildren) {
  // Get the organization ID from the session
  const { orgId, userId } = await auth()

  // If the user has an active organization, render the children
  if (orgId || userId) {
    return <>{children}</>
  }

  // If the user does not have an active organization, render the organization selection page
  return (
    <>
      <Navbar />
      <section className="w-full flex-1 flex items-center justify-center">
        <Card className="w-[800px] h-screen sm:h-auto flex flex-col items-center">
          <CardHeader>
            <CardTitle>Welcome to the Organization Selection page.</CardTitle>
            <CardDescription>
              This part of the application requires the user to select an
              organization in order to proceed. If you are not part of an
              organization, you can accept an invitation or create your own
              organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationList />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
