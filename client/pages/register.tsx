import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import Router from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import swal from 'sweetalert'
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'

import Base from '@/components/Base'
import { avatars } from '@/utils'
import { registerAPI } from '@/api'

interface Inputs {
  first_name: string
  last_name: string
  email: string
  password: string
}

export default function Register() {
  const { trigger, isMutating, data, reset } = useSWRMutation(
    '/api/register',
    registerAPI
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    trigger(data)
  }

  useEffect(() => {
    if (data) {
      swal(
        'Congratulations!',
        'Account created. Please click ok to login!',
        'success'
      ).then((value) => {
        if (value) {
          Router.push('/login')
        }
      })
    }
  }, [])

  return (
    <Base>
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            >
              Amazing people{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, purple.400,purple.400)"
                bgClip="text"
              >
                &
              </Text>{' '}
              Genius Leaders from the earth
            </Heading>

            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={{ base: 'md', md: 'lg' }}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, purple.400,purple.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>

              <Text
                fontFamily={'heading'}
                fontSize={{ base: '4xl', md: '6xl' }}
              >
                +
              </Text>

              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                minWidth={{ base: '44px', md: '60px' }}
                minHeight={{ base: '44px', md: '60px' }}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Stack>

          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
          >
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              >
                Join our community
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, purple.400, purple.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>

              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                We’re looking for amazing engineers just like you! Become a part
                of our rockstar engineering team and skyrocket your career!
              </Text>
            </Stack>
            <Box as={'form'} mt={10} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl
                  id="first-name-register"
                  isInvalid={errors.first_name ? true : false}
                >
                  <Input
                    type="text"
                    placeholder="First Name"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    {...register('first_name', {
                      required: 'First name is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.first_name && errors.first_name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="last-name-register"
                  isInvalid={errors.last_name ? true : false}
                >
                  <Input
                    type="text"
                    placeholder="Last Name"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    {...register('last_name', {
                      required: 'Last name is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.last_name && errors.last_name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={errors.email ? true : false}>
                  <Input
                    type="email"
                    placeholder="Email"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="password-register"
                  isInvalid={errors.password ? true : false}
                >
                  <Input
                    type="password"
                    bg={'gray.100'}
                    placeholder="Password"
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <Button
                fontFamily={'heading'}
                mt={8}
                type="submit"
                w={'full'}
                colorScheme="purple"
                isLoading={isMutating}
              >
                Submit
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Box>
    </Base>
  )
}
