import TopicCreateForm from '@/components/Topics/TopicCreateForm'
import TopicList from '@/components/Topics/TopicList'

export default function Page() {
  return (
    <div className='flex justify-between'>
      <div>
        <h1 className='text-xl mt-2'>Top Posts</h1>
      </div>
      <div>
        <TopicCreateForm />
        <TopicList />
      </div>
    </div>
  )
}
