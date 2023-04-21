import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useForm, SubmitHandler } from 'react-hook-form'
import swal from 'sweetalert'

import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  FormErrorMessage,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'

import { createPostAPI } from '@/api'

interface Inputs {
  content: string
  accessToken: string
}

interface Props {
  accessToken: string
}

export default function CreatePost({ accessToken }: Props) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      accessToken,
    },
  })

  const { trigger, isMutating, data, reset } = useSWRMutation(
    '/api/post/create',
    createPostAPI
  )

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    trigger(data)
  }

  useEffect(() => {
    if (data) {
      swal('Congratulations!', 'Tweet posted...', 'success')
      reset()
      resetForm()
    }
  }, [data])

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl
            id="tweet-content"
            isInvalid={errors.content ? true : false}
          >
            <FormLabel>Tweet</FormLabel>

            <Textarea
              placeholder="Write something"
              isDisabled={isMutating}
              {...register('content', { required: 'Tweet is required' })}
            />

            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={10}>
            <Button
              colorScheme="purple"
              type="submit"
              isLoading={isMutating || isSubmitting}
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}
