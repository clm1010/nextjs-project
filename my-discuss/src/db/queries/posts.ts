import { prisma } from '@/db'
import type { Post } from '@prisma/client'

// 查询帖子返回类型
export type PostWithData = {
  user: {
    name: string | null
    image?: string | null
  }
  topic: {
    name: string
  }
  _count: {
    comments: number
  }
} & Post

/**
 * @description 根据话题名称查询帖子
 * @param name 话题名称
 * @returns Promise<PostWithData[]>
 */
export const fetchPostsByTopicName = (
  name: string
): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    where: {
      topic: {
        name
      }
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    }
  })
}

/**
 * @description 查询热门帖子
 * @returns Promise<PostWithData[]>
 */
export const fetchTopPosts = (): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc'
        }
      }
    ],
    take: 5,
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    }
  })
}

/**
 * @description fetchPostShow 查询帖子详情
 * @param postId 帖子id
 * @returns Post帖子对象 Promise<Post | null>
 */
export const fetchPostShow = (postId: string): Promise<Post | null> => {
  return prisma.post.findFirst({
    where: {
      id: postId
    }
  })
}
