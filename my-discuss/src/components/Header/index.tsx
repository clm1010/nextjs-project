import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Link
} from '@heroui/react'
import HeaderAuth from './HeaderAuth'

export const AcmeLogo = () => {
  return (
    <svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
      <path
        clipRule='evenodd'
        d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  )
}

/**
 * @description 头部组件
 */
export default async function Header() {
  return (
    <Navbar className='border-b-1 border-gray-200'>
      <NavbarBrand>
        <AcmeLogo />
        <Link className='font-bold text-inherit' href='/'>
          MyDiscuss
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Input
            className='w-[100px] lg:w-[300px]'
            type='search'
            placeholder='Search...'
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}
