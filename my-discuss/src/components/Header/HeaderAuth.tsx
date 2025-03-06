'use client'
import { useSession } from 'next-auth/react'
import { SignIn, SignOut } from '@/actions/index'
import {
  NavbarItem,
  Form,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner
} from '@heroui/react'

/**
 * @description 头部验证组件
 */
export default function HeaderAuth() {
  let authContent: React.ReactNode

  // 客户端组件方式，获取当前用户的信息
  const { data: session, status } = useSession()
  if (status === 'loading') {
    authContent = <Spinner size='md' variant='gradient' color='secondary' />
  } else if (session?.user) {
    authContent = (
      <Popover placement='bottom'>
        <PopoverTrigger>
          <Avatar
            className='cursor-pointer'
            showFallback
            isBordered
            color='secondary'
            src={
              session.user.image ||
              'https://i.pravatar.cc/150?u=a042581f4e29026024d'
            }
            alt='Avatar'
          />
        </PopoverTrigger>
        <PopoverContent className='p-0'>
          <Card className='max-w-[300px]' shadow='lg'>
            <CardHeader className='flex gap-3'>
              <Avatar
                isBordered
                radius='full'
                size='lg'
                src={
                  session.user.image ||
                  'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                }
              />
              <div className='flex flex-col'>
                <p className='text-md'>{session.user.name}</p>
                <p className='text-small text-default-500'>
                  {session.user.email}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Full-stack developer, @hero_ui lover she/her
                <span aria-label='confetti' role='img'>
                  🎉
                </span>
              </p>
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-end'>
              <Form action={SignOut}>
                <Button type='submit' color='secondary'>
                  Sign Out
                </Button>
              </Form>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    )
  } else {
    authContent = (
      <>
        <NavbarItem className='hidden lg:flex'>
          <Form action={SignIn}>
            <Button type='submit' color='secondary' variant='bordered'>
              Sign In
            </Button>
          </Form>
        </NavbarItem>
        <NavbarItem>
          <Form action={SignIn}>
            <Button type='submit' color='secondary'>
              Sign Up
            </Button>
          </Form>
        </NavbarItem>
      </>
    )
  }
  return authContent
}
