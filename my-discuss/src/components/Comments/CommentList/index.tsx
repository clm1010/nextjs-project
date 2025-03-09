import CommentShow from '@/components/Comments/CommentShow/index'
import { fetchCommentsByPostId } from '@/db/queries/comment'

interface CommentListProps {
  postId: string
}

/**
 * @description 评论列表 组件
 */
export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId)
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">All 20 comments</h1>
      {comments.map((comment) => (
        <CommentShow key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
