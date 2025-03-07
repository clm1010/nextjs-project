import { Skeleton, Card } from '@heroui/react'

/**
 * @description Skeleton 骨架是显示加载状态和占位符 组件
 */
export default function PostShowLoading() {
  return (
    <Card className='w-full space-y-4 p-4' radius='md'>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-secondary' />
      </Skeleton>
      <div className='space-y-3'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='h-2 w-full rounded-lg bg-secondary' />
        </Skeleton>
        <Skeleton className='w-4/5 rounded-lg'>
          <div className='h-2 w-full rounded-lg bg-secondary-300' />
        </Skeleton>
        <Skeleton className='w-2/5 rounded-lg'>
          <div className='h-2 w-full rounded-lg bg-secondary-200' />
        </Skeleton>
      </div>
      <Skeleton className='w-1/5 rounded-lg'>
        <div className='h-6 bg-secondary' />
      </Skeleton>
    </Card>
  )
}
