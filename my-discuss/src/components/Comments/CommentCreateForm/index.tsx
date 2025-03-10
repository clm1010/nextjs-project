'use client'
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState
} from 'react'
import { Form, Textarea, Button, Chip } from '@heroui/react'
import { CreateComment } from '@/actions/index'
// import { sleep } from '@/utils'

interface CreateCommentFormProps {
  postId: string,
  isOpen?: boolean
}

/**
 * @description 评论组件
 */
export default function CommentCreateForm({ postId, isOpen }: CreateCommentFormProps) {
  // 显示或隐藏评论
  const [open, setOpen] = useState(isOpen)
  const [state, formAction, isPending] = useActionState(
    CreateComment.bind(null, { postId }),
    {
      errors: {}
    }
  )

  // 处理表单提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    startTransition(() => formAction(formData))
  }

  const formRef = useRef<HTMLFormElement | null>(null)
  // 处理表单重置
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <div className="space-y-2 mt-4">
      <Button
        color="secondary"
        size="sm"
        variant={open ? 'shadow' : 'flat'}
        onPress={() => setOpen(!open)}
      >
        Reply
      </Button>
      {open && (
        <Form
          ref={formRef}
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
            <Chip
              className="mx-auto"
              variant="bordered"
              radius="sm"
              color="danger"
            >
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
      )}
    </div>
  )
}
