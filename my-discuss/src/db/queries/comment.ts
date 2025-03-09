import { prisma } from '@/db'
import type { Comment } from '@prisma/client'

// 评论返回类型
export type CommentWithUser = {
  user: {
    name: string | null
    image: string | null
  }
} & Comment

/**
 * @description 根据帖子id查询评论
 * @param postId 帖子id
 * @returns Promise <CommentWithUser[]>
 */
export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithUser[]> {
  return prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}
