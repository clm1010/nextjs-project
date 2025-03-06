'use client'
import { Listbox, ListboxItem } from '@heroui/react'

/**
 * @description PostList 帖子列表组件
 */
export default function PostList() {
  return (
    <Listbox
      aria-label='Post List'
      className='p-0 gap-4 w-full overflow-visible shadow-small rounded-medium'
      itemClasses={{
        base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80'
      }}
    >
      <ListboxItem
        description={<p className='text-small'>By Infer</p>}
        endContent={
          <span className='text-small text-gray-400'>88 comments</span>
        }
      >
        Route
      </ListboxItem>
    </Listbox>
  )
}
