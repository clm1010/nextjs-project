import { signIn } from '@/auth'
import { Button } from '@heroui/react'

/**
 * @description 登录
 */
export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <Button type='submit' color='primary'>
        Signin with GitHub
      </Button>
    </form>
  )
}
