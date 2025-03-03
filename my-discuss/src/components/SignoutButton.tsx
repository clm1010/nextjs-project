import { signOut } from '@/auth'
import { Button } from '@heroui/react'

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button type='submit' color='secondary'>
        Sign Out
      </Button>
    </form>
  )
}
