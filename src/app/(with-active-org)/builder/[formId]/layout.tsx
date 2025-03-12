export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen flex-grow mx-auto">{children}</div>
  )
}
