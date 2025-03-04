'use server'
import { z } from 'zod'
import { auth } from '@/auth'

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

export async function CreateTopic(
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const name = formData.get('name')
  const description = formData.get('description')
  const result = createTopicSchema.safeParse({ name, description })

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
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

  return {
    errors: {}
  }
  console.log(name, description)
}
