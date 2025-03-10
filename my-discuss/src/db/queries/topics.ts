import { prisma } from '@/db'
import { Topic } from '@prisma/client'

// 查询话题返回类型
export type TopicWithData = {
  _count: {
    posts: number
  }
} & Topic

/**
 * @description 查询话题
 */
export const fetchTopics = (): Promise<TopicWithData[]> => {
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
export const fetchFindFirstTopic = (params: {
  name: string
}): Promise<Topic | null> => {
  const { name } = params
  return prisma.topic.findFirst({
    where: {
      name
    }
  })
}

/**
 * @description 根据帖子id查询话题
 * @param params postId
 * @returns topic
 */
export const fetchFindFirstTopicObjectByPostId = (params: {
  postId: string
}): Promise<Topic | null> => {
  const { postId } = params
  return prisma.topic.findFirst({
    where: {
      posts: {
        // some 集合中至少有一个满足条件
        some: {
          id: postId
        }
      }
    }
  })
}
