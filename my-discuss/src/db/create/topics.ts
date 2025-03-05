import { prisma } from '@/db'

type paramsType = {
  name: string
  description: string
  userId: string
}

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
