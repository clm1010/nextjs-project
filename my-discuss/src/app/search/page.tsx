import { redirect } from 'next/navigation'

interface SearchPageProps {
  searchParams: Promise<{ postnameorcontent: string }>
}

/**
 * @description 搜索页
 * @param param Promise<{ postnameorcontent: string }>
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { postnameorcontent } = await searchParams

  if (!postnameorcontent) {
    redirect('/')
  }
  return <div>{postnameorcontent}</div>
}
