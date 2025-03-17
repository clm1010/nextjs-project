'use server'
import { z } from 'zod'
import { auth } from '@/auth'
// import type { Comment } from '@prisma/client'
import { fetchCreateComment } from '@/db/create/comment'
import { fetchFindFirstTopicObjectByPostId } from '@/db/queries/topics'
import { revalidatePath } from 'next/cache'

interface CreateCommentFormState {
  errors: {
    content?: string[]
    _form?: string[]
  }
  success?: boolean
}

// 校验表单
const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3)
    .regex(
      /^[\u4e00-\u9fa5a-zA-Z0-9_，。；：”“‘’！、？""''!?\.《》<>()（）\s]+$/,
      {
        message:
          'Content cannot be less than 6 characters and can contain only letters, digits, and underscores.'
      }
    )
})

/**
 * @description CreateComment 创建评论表单提交处理
 * @param param 帖子的postId, 后面回复还需要 parentId { postId: string | parentId: string }
 * @param prevState
 * @param formData 表单
 * @returns
 */
export async function CreateComment(
  { postId, parentId }: { postId: string; parentId?: string },
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const content = formData.get('content')
  const result = createCommentSchema.safeParse({ content })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a topic.']
      }
    }
  }

  // let comment: Comment

  try {
    // comment = await fetchCreateComment({
    await fetchCreateComment({
      content: result.data.content,
      userId: session.user.id!,
      postId,
      parentId
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

  // 根据帖子id查询话题
  const topic = await fetchFindFirstTopicObjectByPostId({ postId })

  if (!topic) {
    return {
      errors: {
        _form: ['Topic not found.']
      }
    }
  }
  revalidatePath(`/topics/${topic.name}/posts/${postId}`)

  return {
    errors: {},
    success: true
  }
}
