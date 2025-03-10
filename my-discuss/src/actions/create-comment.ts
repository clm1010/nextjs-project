'use server'
import { z } from 'zod'
import { auth } from '@/auth'
import type { Comment } from '@prisma/client'
import { fetchCreateComment } from '@/db/create/comment'
import { fetchFindFirstTopicObjectByPostId } from '@/db/queries/topics'
import { revalidatePath } from 'next/cache'

interface CreateCommentFormState {
  errors: {
    content?: string[]
    _form?: string[]
  }
}

// 校验表单
const createCommentSchema = z.object({
  content: z.string().min(3)
})

/**
 * @description CreateComment 创建评论表单提交处理
 * @param param 帖子的postId, 后面回复还需要 parentId { postId: string | parentId: string }
 * @param prevState
 * @param formData 表单
 * @returns
 */
export async function CreateComment(
  { postId }: { postId: string },
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

  let comment: Comment

  try {
    comment = await fetchCreateComment({
      content: result.data.content,
      userId: session.user.id!,
      postId
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
  console.log(comment, 'comment')
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
    errors: {}
  }
}
