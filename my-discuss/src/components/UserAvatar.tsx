import { auth } from '@/auth'
import { Image } from '@heroui/react'

export default async function UserAvatar() {
  const session = await auth()

  if (!session?.user) return <div>Not authenticated</div>

  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <Image src={session.user.image || ''} alt='User Avatar' />
    </div>
  )
}
