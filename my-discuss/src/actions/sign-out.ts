'use server'
import { signOut } from '@/auth'

/**
 * @description 退出
 */
export async function SignOut() {
  return await signOut()
}
