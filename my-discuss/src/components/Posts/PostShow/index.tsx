import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react'
import { fetchPostShow } from '@/db/queries/posts'
import { notFound } from 'next/navigation'
// import { sleep } from '@/utils'

interface PostShowProps {
  postId: string
}

/**
 * @description 帖子详情组件
 * @param params PostShow { name: string postId: string }
 */
export default async function PostShow({ postId }: PostShowProps) {
  // await sleep(5000)
  const post = await fetchPostShow(postId)

  if (!post) {
    notFound()
  }
  return (
    <Card isFooterBlurred className='border-none' radius='lg'>
      <CardHeader className='justify-between'>
        <h3 className='text-2xl'>{post.title}</h3>
      </CardHeader>
      <CardBody className='px-3 py-0 text-medium text-default-400'>
        <p>{post.content}</p>

        {/* <span className='pt-2'>
          #FrontendWithZoey
          <span className='py-2'>
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          </span>
        </span> */}
      </CardBody>
      <CardFooter className='gap-3'>
        <p>{post.title}</p>
      </CardFooter>
    </Card>
  )
}
