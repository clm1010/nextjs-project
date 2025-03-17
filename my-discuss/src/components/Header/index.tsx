'use client'
import { Suspense } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link
} from '@heroui/react'
// import dynamic from 'next/dynamic'
import HeaderAuth from './HeaderAuth'
import SearchInput from '../SearchInput'
import ThemeSwitcher from '../ThemeSwitcher'

// const ThemeSwitcher = dynamic(() => import('../ThemeSwitcher'), { ssr: false })

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

/**
 * @description 头部组件
 */
export default function Header() {
  return (
    <Navbar className="shadow-md dark:shadow-purple-800">
      <NavbarBrand>
        <Link
          className="flex items-center text-inherit ml-[-10px] dark:text-purple-800"
          href="/"
        >
          <AcmeLogo />
          <h1 className="font-bold">MyDiscuss</h1>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}
