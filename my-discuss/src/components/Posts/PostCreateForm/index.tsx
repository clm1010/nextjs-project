'use client'

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  Divider
  // Chip
} from '@heroui/react'

/**
 * @description PostCreateForm
 */
export default function PostCreateForm() {
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button className='block ml-auto' color='secondary' variant='bordered'>
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-full'>
        <Card className='w-80 max-w-md' shadow='lg'>
          <CardHeader>Create a Post</CardHeader>
          <Divider />
          <CardBody>
            <Form validationBehavior='aria'>
              <Input
                label='title'
                labelPlacement='outside'
                name='title'
                placeholder='Enter your title'
                type='text'
              />

              <Textarea
                className='max-w-xs'
                label='Content'
                labelPlacement='outside'
                name='content'
                placeholder='Enter your content'
              />
              <div className='flex gap-2 w-full'>
                <Button className='flex-1' color='secondary' type='submit'>
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>

          {/* {state.errors._form ? (
            <CardFooter>
              <Chip
                className='mx-auto'
                variant='bordered'
                radius='sm'
                color='danger'
              >
                {state.errors._form.join(', ')}
              </Chip>
            </CardFooter>
          ) : null} */}
        </Card>
      </PopoverContent>
    </Popover>
  )
}
