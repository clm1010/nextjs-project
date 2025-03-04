import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
  Input,
  Card,
  CardHeader,
  CardBody,
  Divider
} from '@heroui/react'

export default function TopicCreateForm() {
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='secondary' variant='bordered'>
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-full'>
        <Card className='max-w-[400px]' shadow='lg'>
          <CardHeader>Create a Topic</CardHeader>
          <Divider />
          <CardBody>
            <Form>
              <Input
                isRequired
                errorMessage='Please enter a valid username'
                label='Username'
                labelPlacement='outside'
                name='username'
                placeholder='Enter your username'
                type='text'
              />

              <Input
                isRequired
                errorMessage='Please enter a valid email'
                label='Email'
                labelPlacement='outside'
                name='email'
                placeholder='Enter your email'
                type='email'
              />
              <div className='flex gap-2'>
                <Button color='secondary' type='submit'>
                  Submit
                </Button>
                <Button type='reset' variant='flat'>
                  Reset
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
