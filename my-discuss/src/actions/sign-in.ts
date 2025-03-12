'use server'
import { signIn } from '@/auth'

/**
 * @description GitHub 登录
 */
export async function SignInGitHub() {
  return await signIn('github')
}


/**
 * @description Gitee 登录
 */
export async function SignInGitee() {
  return await signIn('gitee')
}

