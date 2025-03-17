import { Suspense } from 'react'
import PostShow from '@/components/Posts/PostShow/index'
import PostShowLoading from '@/components/Posts/PostShowLoading/index'
import CommentCreateForm from '@/components/Comments/CommentCreateForm/index'
import CommentList from '@/components/Comments/CommentList'

interface PostShowPageProps {
  params: Promise<{
    name: string
    postId: string
  }>
}

/**
 * @description 帖子详情页
 * @param params PostShowPageProps { name: string postId: string }
 */
export default async function PostShowPage({ params }: PostShowPageProps) {
  const { postId } = await params
  return (
    <div className="space-y-4">
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} isOpen />
      <CommentList postId={postId} />
    </div>
  )
}
