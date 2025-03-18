'use client'
import { Listbox, ListboxItem, Avatar } from '@heroui/react'
import type { PostWithData } from '@/db/queries/posts'
import { useRouter } from 'next/navigation'

/**
 * @description PostList 帖子列表组件
 */
export default function PostList({ posts }: { posts: PostWithData[] }) {
  const router = useRouter()

  return (
    <Listbox
      aria-label='Post List'
      itemClasses={{
        base: 'border-small border-default-200 shadow-small rounded-medium mt-4 data-[hover=true]:bg-purple-400/60 dark:border-purple-600'
      }}
    >
      {posts.map((post) => {
        const topicName = post.topic.name
        if (!topicName) {
          throw new Error('Need a topic name to link to a post.')
        }
        return (
          <ListboxItem
            key={post.id}
            textValue={post.title}
            description={
              <p className='text-small mt-4 text-gray-500 dark:text-gray-400'>
                {post.user.name}
              </p>
            }
            startContent={
              post.user.image && (
                <div>
                  <Avatar
                    className='w-8 h-8'
                    showFallback
                    isBordered
                    color='secondary'
                    src={
                      post.user.image ||
                      'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                    }
                  />
                </div>
              )
            }
            endContent={
              <span className='text-small text-gray-400 whitespace-nowrap self-end'>
                {post._count.comments} comments
              </span>
            }
            onPress={() => {
              router.push(`/topics/${topicName}/posts/${post.id}`)
            }}
          >
            <span className='text-medium dark:text-gray-200'>{post.title}</span>
          </ListboxItem>
        )
      })}
    </Listbox>
  )
}
