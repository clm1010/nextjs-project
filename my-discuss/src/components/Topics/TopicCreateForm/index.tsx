'use client'
import {
  startTransition,
  useActionState
  // useEffect,
  // useRef
} from 'react'
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
  CardFooter,
  Divider,
  Chip
} from '@heroui/react'
import { CreateTopic } from '@/actions/index'

/**
 * @description TopicCreateForm 创建话题表单
 */
export default function TopicCreateForm() {
  const [state, formAction, isPending] = useActionState(CreateTopic, {
    errors: {}
  })

  // 处理表单提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    startTransition(() => formAction(formData))
  }

  // 处理表单重置
  // const formRef = useRef<HTMLFormElement | null>(null)
  // useEffect(() => {
  //   if (state.success) {
  //     formRef.current?.reset()
  //   }
  // }, [state])

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button className="block ml-auto" color="secondary" variant="bordered">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Card className="w-80 max-w-md" shadow="lg">
          <CardHeader>Create a Topic</CardHeader>
          <Divider />
          <CardBody>
            <Form
              // ref={formRef}
              onSubmit={handleSubmit}
              validationBehavior="aria"
            >
              <Input
                isInvalid={!!state.errors.name}
                errorMessage={state.errors.name?.join(', ')}
                label="Name"
                labelPlacement="outside"
                name="name"
                placeholder="Enter your name"
                type="text"
              />

              <Textarea
                isInvalid={!!state.errors.description}
                errorMessage={state.errors.description?.join(', ')}
                className="max-w-xs"
                label="Description"
                labelPlacement="outside"
                name="description"
                placeholder="Enter your description"
              />
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1"
                  color="secondary"
                  type="submit"
                  isLoading={isPending}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>

          {state.errors._form ? (
            <CardFooter>
              <Chip
                className="mx-auto"
                variant="bordered"
                radius="sm"
                color="danger"
              >
                {state.errors._form.join(', ')}
              </Chip>
            </CardFooter>
          ) : null}
        </Card>
      </PopoverContent>
    </Popover>
  )
}
