export default function Page({ params }: { params: { shareCode: string } }) {
  const { shareCode } = params
  return <div>Form Page {shareCode}</div>
}
