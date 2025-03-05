'use server'
import { z } from 'zod'
import { auth } from '@/auth'
import type { Topic } from '@prisma/client'
import { redirect } from 'next/navigation'
import { sleep } from '@/utils'
import { fetchCreateTopic } from '@/db/create/topics'

interface CreateTopicFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        'Name must be lest 3 characters long and contain only letters, numbers, and underscores.'
    }),
  description: z.string().min(10).max(4747)
})

/**
 * @description 创建话题表单提交处理
 * @param prevState
 * @param formData 表单
 * @returns
 */
export async function CreateTopic(
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  await sleep(3000)

  // 校验表单
  const name = formData.get('name')
  const description = formData.get('description')
  const result = createTopicSchema.safeParse({ name, description })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  // 校验是否登录
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a topic.']
      }
    }
  }

  let topic: Topic
  try {
    // 创建话题提交数据到数据库
    topic = await fetchCreateTopic({
      name: result.data.name,
      description: result.data.description,
      userId: session.user.id!
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong.']
        }
      }
    }
  }

  redirect(`/topics/${topic.name}`)
}
