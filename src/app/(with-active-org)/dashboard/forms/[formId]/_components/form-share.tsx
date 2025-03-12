"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner"

export const FormShare = ({ shareCode }: { shareCode: string }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONT_END_URL}/form/${shareCode}`
  return (
    <div className="flex flex-col py-4 gap-2">
      <h2 className="text-xl font-bold">Share</h2>
      <p className="text-xs text-muted-foreground">
        Your form is ready to share. Share the link below directly or embed it
        on any site.
      </p>
      {/* share url */}
      <div className="w-full border rounded-xl flex items-center px-2">
        <Input
          className="w-full border-none focus-visible:ring-0 shadow-none"
          readOnly
          value={shareUrl}
        />
        <Button
          size={"icon"}
          onClick={() => {
            navigator.clipboard.writeText(shareUrl)
            toast.success("Copied!")
          }}
        >
          <CopyIcon />
        </Button>
      </div>
    </div>
  )
}
