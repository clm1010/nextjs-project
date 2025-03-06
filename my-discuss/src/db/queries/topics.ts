import { prisma } from '@/db'

/**
 * @description 查询话题
 */
export const fetchTopics = async () => {
  return prisma.topic.findMany({
    include: {
      // 查询话题下面的帖子数量
      _count: {
        select: {
          posts: true
        }
      }
    }
  })
}

/**
 * @description 查询单个话题
 * @param params name 帖子名称
 * @returns topic
 */
export const fetchFindFirstTopic = async (params: { name: string }) => {
  const { name } = params
  return prisma.topic.findFirst({
    where: {
      name
    }
  })
}
