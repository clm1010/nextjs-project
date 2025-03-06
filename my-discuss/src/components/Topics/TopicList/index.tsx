import { Chip, Badge } from '@heroui/react'
import Link from 'next/link'
import { fetchTopics } from '@/db/queries/topics'

// 抽离话题列表組件
export const ListBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-[260px] rounded-small border-2 mt-4 p-4 flex flex-wrap gap-4'>
      {children}
    </div>
  )
}

/**
 * @description TopicList 话题列表
 */
export default async function TopicList() {
  //  查询话题
  const topics = await fetchTopics()
  console.log(topics, 'topics')
  return (
    <ListBoxWrapper>
      {topics.map((topic) => {
        return (
          <Badge
            key={topic.id}
            size='sm'
            shape='circle'
            color='secondary'
            variant='shadow'
            content={topic._count.posts}
          >
            <Chip
              classNames={{
                base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                content: 'drop-shadow shadow-black text-white'
              }}
              variant='shadow'
              color='default'
            >
              <Link href={`/topics/${topic.name}`}>{topic.name}</Link>
            </Chip>
          </Badge>
        )
      })}
    </ListBoxWrapper>
  )
}
