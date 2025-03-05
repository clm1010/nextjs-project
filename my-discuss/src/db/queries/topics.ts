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
