import { prisma } from '@/db'

interface paramsType {
  name: string
  description: string
  userId: string
}

/**
 * @description 创建话题
 * @param params paramsType { name, description, userId }
 * @returns
 */
export const fetchCreateTopic = async (params: paramsType) => {
  const { name, description, userId } = params
  return prisma.topic.create({
    data: {
      name,
      description,
      userId
    }
  })
}
