import PostCreateForm from '@/components/Posts/PostCreateForm/index'
import PostList from '@/components/Posts/PostList/index'
import { fetchPostsByTopicName } from '@/db/queries/posts'

interface TopicShowPageProps {
  params: Promise<{ name: string }>
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const name = (await params).name
  if (!name) {
    throw new Error('name is required')
  }
  const postListData = await fetchPostsByTopicName(name)
  return (
    <div className="flex justify-between">
      <div className="w-3/5">
        <h1 className="text-xl mt-2 ">{name}</h1>
        <PostList posts={postListData} />
      </div>
      <div>
        <PostCreateForm name={name} />
      </div>
    </div>
  )
}
