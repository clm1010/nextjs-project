'use client'

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip
} from '@heroui/react'
import { startTransition, useActionState } from 'react'
import { CreatePost } from '@/actions/index'

interface PostCreateFormProps {
  name: string
}

/**
 * @description PostCreateForm
 */
export default function PostCreateForm({ name }: PostCreateFormProps) {
  const [state, formAction, isPending] = useActionState(
    CreatePost.bind(null, name),
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

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button className='block ml-auto' color='secondary' variant='bordered'>
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-full'>
        <Card className='w-80 max-w-md' shadow='lg'>
          <CardHeader>Create a Post</CardHeader>
          <Divider />
          <CardBody>
            <Form onSubmit={handleSubmit} validationBehavior='aria'>
              <Input
                isInvalid={!!state.errors.title}
                errorMessage={state.errors.title?.join(', ')}
                label='Title'
                labelPlacement='outside'
                name='title'
                placeholder='Enter your title'
                type='text'
              />

              <Textarea
                isInvalid={!!state.errors.content}
                errorMessage={state.errors.content?.join(', ')}
                className='max-w-xs'
                label='Content'
                labelPlacement='outside'
                name='content'
                placeholder='Enter your content'
              />
              <div className='flex gap-2 w-full'>
                <Button
                  className='flex-1'
                  color='secondary'
                  type='submit'
                  isLoading={isPending}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>

          {state.errors._form ? (
            <CardFooter>
              <Chip
                className='mx-auto'
                variant='bordered'
                radius='sm'
                color='danger'
              >
                {state.errors._form.join(', ')}
              </Chip>
            </CardFooter>
          ) : null}
        </Card>
      </PopoverContent>
    </Popover>
  )
}
