import { prisma } from '@/db'

interface paramsType {
  title: string
  content: string
  userId: string
  topicId: string
}

/**
 * @description 创建帖子
 * @param params paramsType { title, content, userId, topicId }
 * @returns
 */
export const fetchCreatePost = (params: paramsType) => {
  const { title, content, userId, topicId } = params
  return prisma.post.create({
    data: {
      title,
      content,
      userId,
      topicId
    }
  })
}
