'use client'
import { startTransition, useActionState } from 'react'
import { Form, Textarea, Button, Chip } from '@heroui/react'
import { CreateComment } from '@/actions/index'

interface CreateCommentFormProps {
  postId: string
}

/**
 * @description 评论组件
 */
export default function CommentCreateForm({ postId }: CreateCommentFormProps) {
  const [state, formAction, isPending] = useActionState(
    CreateComment.bind(null, { postId }),
    {
      errors: {}
    }
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    startTransition(() => formAction(formData))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className="space-y-4"
      validationBehavior="aria"
    >
      <Textarea
        name="content"
        // className='max-w-xs'
        label="Reply"
        labelPlacement="inside"
        placeholder="Enter your comment..."
        isInvalid={!!state.errors.content}
        errorMessage={state.errors.content?.join(', ')}
      />
      {state.errors._form ? (
        <Chip className="mx-auto" variant="bordered" radius="sm" color="danger">
          {state.errors._form.join(', ')}
        </Chip>
      ) : null}
      <Button
        type="submit"
        color="secondary"
        variant="bordered"
        isLoading={isPending}
      >
        Create Comment
      </Button>
    </Form>
  )
}
