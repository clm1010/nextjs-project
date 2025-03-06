import TopicCreateForm from '@/components/Topics/TopicCreateForm'
import TopicList from '@/components/Topics/TopicList'
import PostList from '@/components/Posts/PostList'
import { fetchTopPosts } from '@/db/queries/posts'

export default async function Page() {
  const postTopListData = await fetchTopPosts()
  return (
    <div className='flex justify-between'>
      <div className='w-3/5'>
        <h1 className='text-xl mt-2'>Top Posts</h1>
        <PostList posts={postTopListData} />
      </div>
      <div>
        <TopicCreateForm />
        <TopicList />
      </div>
    </div>
  )
}
