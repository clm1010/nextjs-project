import { Form, Textarea, Button } from '@heroui/react'

/**
 * @description 评论组件
 */
export default function CommentCreateForm() {
  return (
    <Form className='space-y-4'>
      <Textarea
        name='content'
        // className='max-w-xs'
        label='Reply'
        labelPlacement='inside'
        placeholder='Enter your comment...'
      />
      <Button type='submit' color='secondary' variant='bordered'>
        Create Comment
      </Button>
    </Form>
  )
}
