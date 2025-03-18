'use server'
import { z } from 'zod'
import { auth } from '@/auth'
import type { Topic } from '@prisma/client'
import { redirect } from 'next/navigation'
// import { sleep } from '@/utils'
import { fetchCreateTopic } from '@/db/create/topics'
import { revalidatePath } from 'next/cache'

interface CreateTopicFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
  success?: boolean
}

const createTopicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .regex(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/, {
      message:
        'Name cannot be less than 3 characters and can contain only letters, digits, and underscores.'
    }),
  description: z
    .string()
    .trim()
    .min(6)
    .max(4747)
    .regex(/^[\u4e00-\u9fa5a-zA-Z0-9_，。；：”“‘’！？""''!?.《》<>()（）]+$/, {
      message:
        'Description cannot be less than 6 characters and can contain only letters, digits, and underscores.'
    })
})

/**
 * @description CreateTopic 创建话题表单提交处理
 * @param prevState
 * @param formData 表单
 * @returns
 */
export async function CreateTopic(
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // await sleep(3000)

  // 校验表单
  const name = formData.get('name')
  const description = formData.get('description')
  const result = createTopicSchema.safeParse({ name, description })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false
    }
  }

  // 校验是否登录
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a topic.']
      },
      success: false
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
        },
        success: false
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong.']
        },
        success: false
      }
    }
  }

  // 校验缓存，否则上线的项目新建后没有数据，不显示
  revalidatePath('/')

  redirect(`/topics/${topic.name}`)
}
