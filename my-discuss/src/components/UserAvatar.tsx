import { auth } from '@/auth'
import { Image } from '@heroui/react'

export default async function UserAvatar() {
  // 获取当前用户的会话信息
  const session = await auth()

  if (!session?.user) return <div>Not authenticated</div>

  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <Image src={session.user.image || ''} alt='User Avatar' />
    </div>
  )
}
