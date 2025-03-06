'use server'
import { z } from 'zod'
import { auth } from '@/auth'
import type { Post } from '@prisma/client'
import { redirect } from 'next/navigation'
import { fetchFindFirstTopic } from '@/db/queries/topics'
import { fetchCreatePost } from '@/db/create/posts'

// 表单类型
interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

// 校验表单
const createPostSchema = z.object({
  title: z
    .string()
    .min(3),
    // .regex(/^[a-zA-Z0-9]+$/, {
    //   message:
    //     'Name must be lest 3 characters long and contain only letters, numbers, and underscores.'
    // }),
  content: z.string().min(10).max(4747)
})

/**
 * @description CreatePost 创建帖子表单提交处理
 * @param prevState
 * @param formData 表单
 * @returns
 */
export async function CreatePost(
  name: string,
  prevState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const title = formData.get('title')
  const content = formData.get('content')
  const result = createPostSchema.safeParse({ title, content })

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

  // 校验话题是否存在
  if (!name) {
    return {
      errors: {
        _form: ['Topic name not found.']
      }
    }
  }

  // 查询单个话题
  const topic = await fetchFindFirstTopic({ name })
  console.log(topic, 'topic')
  if (!topic) {
    return {
      errors: {
        _form: ['Topic not found.']
      }
    }
  }

  let post: Post

  try {
    // 创建帖子
    post = await fetchCreatePost({
      title: result.data.title,
      content: result.data.content,
      userId: session.user.id!,
      topicId: topic.id
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
  redirect(`/topics/${topic.name}/posts/${post.id}`)
}
