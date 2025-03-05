import PostCreateForm from '@/components/Posts/PostCreateForm/index'

interface TopicShowPageProps {
  params: Promise<{ name: string }>
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const name = (await params).name
  return (
    <div className='flex justify-between'>
      <div>
        <h1 className='text-xl mt-2'>{name}</h1>
      </div>
      <div>
        <PostCreateForm />
      </div>
    </div>
  )
}
