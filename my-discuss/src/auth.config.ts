import GitHub from 'next-auth/providers/github'
import Gitee from './providers/gitee'
import type { NextAuthConfig } from 'next-auth'

// Notice this is only an object, not a full Auth.js instance
export default {
  // 使用 GitHub 作为身份验证提供商，登录和注销
  providers: [GitHub, Gitee]
} satisfies NextAuthConfig
