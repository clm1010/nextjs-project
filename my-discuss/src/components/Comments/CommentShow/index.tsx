import { Image } from '@heroui/react'
import dayjs from 'dayjs'
import {
  type CommentWithUser,
  fetchCommentsByPostId
} from '@/db/queries/comment'
import CommentCreateForm from '../CommentCreateForm/index'

// image src
// https://i.pravatar.cc/150?u=a04258114e29026702d
// https://i.pravatar.cc/150?u=a04258a2462d826712d
// https://i.pravatar.cc/150?u=a042581f4e29026704d

/**
 * @description 评论展示 组件
 */
export default async function CommentShow({
  comment
}: {
  comment: CommentWithUser
}) {
  const { user, content, postId, id: commentId } = comment
  // 从所有的评论中找到 parentId 等于当前的 comment.id ,找到的那个就是谁的 子评论
  const comments = await fetchCommentsByPostId(postId)
  return (
    <div className='mt-2 p-4 rounded-lg shadow-small'>
      <div className='flex gap-4'>
        <Image
          className='w-10 h-10 rounded-full'
          width={40}
          height={40}
          src={user.image || 'https://i.pravatar.cc/150?u=a04258114e29026702d'}
          alt='User Avatar'
        />
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-500'>{user.name}</p>
          <p className='flex justify-between items-center'>
            <span className='flex-1  text-gray-900'>{content}</span>
            <span className='w-[150px] text-right text-gray-400 text-sm'>
              {dayjs(comment.createdAt).format('YYYY/MM/DD HH:mm:ss')}
            </span>
          </p>
          <CommentCreateForm postId={postId} parentId={commentId} />
        </div>
      </div>
      {comments
        .filter((item) => item.parentId === commentId)
        .map((comm) => {
          return <CommentShow key={comm.id} comment={comm} />
        })}
    </div>
  )
}
