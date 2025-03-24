"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { CreateTeamForm } from "./team/create-team-form"

export const DashboardSetup = () => {
  return (
    <Card className="w-[800px] h-screen sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Team</CardTitle>
        <CardDescription>
          Lets create a private team to get you started. You can add
          collaborators later from the team settings section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateTeamForm />
      </CardContent>
    </Card>
  )
}
