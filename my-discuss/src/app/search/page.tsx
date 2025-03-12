import { redirect } from 'next/navigation'
import { fetchPostsByPostNameOrContent } from '@/db/queries/posts'
import PostList from '@/components/Posts/PostList'

interface SearchPageProps {
  searchParams: Promise<{ postnameorcontent: string }>
}

/**
 * @description 搜索页
 * @param param Promise<{ postnameorcontent: string }>
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { postnameorcontent } = await searchParams
  // 查询帖子名称或内容
  const posts = await fetchPostsByPostNameOrContent(postnameorcontent)

  if (!postnameorcontent) {
    redirect('/')
  }

  return <PostList posts={posts} />
}
