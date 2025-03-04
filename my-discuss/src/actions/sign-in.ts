'use server'
import { signIn } from '@/auth'

/**
 * @description 登录
 */
export async function SignIn() {
  return await signIn('github')
}
