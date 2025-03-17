'use client'
import { useSession } from 'next-auth/react'
import { SignInGitHub, SignInGitee, SignOut } from '@/actions/index'
import {
  NavbarItem,
  Form,
  Button,
  Avatar,
  User,
  // Link,
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
  console.log(session?.user, 'session')
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
              <User
                avatarProps={{
                  src:
                    session.user.image ||
                    'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                }}
                description={
                  // <Link isExternal href='https://x.com/jrgarciadev' size='sm'>
                  // {session.user.email}
                  // </Link>
                  <p className='text-small text-default-500'>
                    {session.user.email}
                  </p>
                }
                name={session.user.name || 'User'}
              />
            </CardHeader>
            <Divider />
            <CardBody>
              <p className='dark:text-gray-200'>
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
          <Form action={SignInGitHub}>
            <Button
              type='submit'
              size='sm'
              color='secondary'
              variant='bordered'
            >
              GitHub
            </Button>
          </Form>
        </NavbarItem>
        <NavbarItem>
          <Form action={SignInGitee}>
            <Button type='submit' size='sm' color='secondary'>
              Gitee
            </Button>
          </Form>
        </NavbarItem>
      </>
    )
  }
  return authContent
}
