import { useMediaQuery } from "@/hooks/use-media-query"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { Drawer } from "vaul"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { cn } from "@/lib/utils"

interface ModalProps {
  children?: ReactNode
  className?: string
  onClose: () => void
  open: boolean
  desktopOnly?: boolean
}

export const Modal = ({
  children,
  className,
  desktopOnly,
  onClose,
  open,
}: ModalProps) => {
  const { isMobile } = useMediaQuery()

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root open={open} onOpenChange={onClose}>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              "fixed !max-w-none bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white",
              className
            )}
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>

            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Dialog</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
