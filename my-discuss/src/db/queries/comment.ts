import { prisma } from '@/db'
import type { Comment } from '@prisma/client'
import { cache } from 'react'

// 评论返回类型
export type CommentWithUser = {
  user: {
    name: string | null
    image: string | null
  }
} & Comment


/**
 * @description 根据帖子id查询评论
 * @description 使用 react cache 缓存，优化性能，避免不必要的请求执行多次
 * @function fetchCommentsByPostId
 * @param postId 帖子id
 * @returns Promise <CommentWithUser[]>
 */
export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithUser[]> => {
    // console.log('🐮🐮🐮')
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
)
