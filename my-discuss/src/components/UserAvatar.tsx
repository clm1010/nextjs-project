import { auth } from '@/auth'
import { Image } from '@heroui/react'

export default async function UserAvatar() {
  // 获取当前用户的信息
  const session = await auth()

  if (!session?.user) return <div>Not authenticated</div>

  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <Image src={session.user.image || 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} alt='User Avatar' />
    </div>
  )
}
