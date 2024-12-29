export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col flex-1 space-y-4" >{children}</div>
  )
}
