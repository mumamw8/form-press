import { Button } from "@/components/ui/button"
import { AiOutlineClose } from "react-icons/ai"
import { ThemeForm } from "./theme-form"

interface ThemeSidebarProps {
  onClose: () => void
}

export const ThemeSidebar = ({ onClose }: ThemeSidebarProps) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Customize</p>
        <Button size={"icon"} variant={"ghost"} onClick={onClose}>
          <AiOutlineClose />
        </Button>
      </div>
      <ThemeForm />
    </div>
  )
}
