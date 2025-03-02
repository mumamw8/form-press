import { Skeleton } from "../ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export const FormsSectionSkeleton = () => {
  return (
    <>
      <div className="border-b">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Form Title</TableHead>
              <TableHead className="w-[200px]">Status</TableHead>
              <TableHead className="w-[250px]">Last Updated</TableHead>
              <TableHead className="w-[100px] text-right">Responses</TableHead>
              <TableHead className="w-[200px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[50px] m-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[40px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[70px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-5" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export const FormsSectionSkeletonTwo = () => {
  return (
    <div>
      <li className="group hover:bg-muted rounded-lg flex justify-between items-center">
        <div className="flex flex-col flex-1 py-6 px-8 h-full gap-2">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[30px]" />
          </div>
          <Skeleton className="h-3 w-[70px]" />
        </div>
        <div className="pr-8">
          <Skeleton className="h-4 w-4" />
        </div>
      </li>
      <li className="group hover:bg-muted rounded-lg flex justify-between items-center">
        <div className="flex flex-col flex-1 py-6 px-8 h-full gap-2">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[30px]" />
          </div>
          <Skeleton className="h-3 w-[70px]" />
        </div>
        <div className="pr-8">
          <Skeleton className="h-4 w-4" />
        </div>
      </li>
      <li className="group hover:bg-muted rounded-lg flex justify-between items-center">
        <div className="flex flex-col flex-1 py-6 px-8 h-full gap-2">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[30px]" />
          </div>
          <Skeleton className="h-3 w-[70px]" />
        </div>
        <div className="pr-8">
          <Skeleton className="h-4 w-4" />
        </div>
      </li>
      <li className="group hover:bg-muted rounded-lg flex justify-between items-center">
        <div className="flex flex-col flex-1 py-6 px-8 h-full gap-2">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[30px]" />
          </div>
          <Skeleton className="h-3 w-[70px]" />
        </div>
        <div className="pr-8">
          <Skeleton className="h-4 w-4" />
        </div>
      </li>
      <li className="group hover:bg-muted rounded-lg flex justify-between items-center">
        <div className="flex flex-col flex-1 py-6 px-8 h-full gap-2">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[30px]" />
          </div>
          <Skeleton className="h-3 w-[70px]" />
        </div>
        <div className="pr-8">
          <Skeleton className="h-4 w-4" />
        </div>
      </li>
    </div>
  )
}
