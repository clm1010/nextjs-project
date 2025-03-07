import { prisma } from '@/db'

interface paramsType {
  content: string
  userId: string
  postId: string
}

/**
 * @description 创建评论
 * @param params paramsType {content, userId, postId }
 * @returns
 */
export const fetchCreateComment = async (params: paramsType) => {
  const { content, userId, postId } = params
  return prisma.comment.create({
    data: {
      content,
      userId,
      postId
    }
  })
}
