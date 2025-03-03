import SignIn from '@/components/SigninButton'
import SignOut from '@/components/SignoutButton'
import UserAvatar from '@/components/UserAvatar'

export default function Page() {
  return (
    <div>
      <UserAvatar />
      <SignIn />
      <SignOut />
    </div>
  )
}
