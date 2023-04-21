import { useForm, SubmitHandler } from 'react-hook-form'

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

interface Inputs {
  content: string
}

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

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
              isDisabled={false}
              {...register('content', { required: 'Tweet is required' })}
            />

            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={10}>
            <Button colorScheme="purple" type="submit">
              Post
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}
