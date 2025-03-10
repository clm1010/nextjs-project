import { prisma } from '@/db'

interface paramsType {
  content: string
  userId: string
  postId: string
  parentId?: string
}

/**
 * @description 创建评论
 * @function fetchCreateComment
 * @param params paramsType {content, userId, postId }
 * @returns
 */
export const fetchCreateComment = (params: paramsType) => {
  const { content, userId, postId, parentId } = params
  return prisma.comment.create({
    data: {
      content,
      userId,
      postId,
      parentId
    }
  })
}
