interface PostShowPageProps {
  params: Promise<{
    name: string
    postId: string
  }>
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { name, postId } = await params
  return (
    <div>
      <p>name：{name}</p>
      <p>postId：{postId}</p>
    </div>
  )
}
