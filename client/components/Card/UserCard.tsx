import { useEffect, Dispatch, SetStateAction } from 'react'
import useSWRMutation from 'swr/mutation'

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

import { User, followToggleAPI } from '@/api'

interface Props {
  user: User
  access: string
  current_user: string
  refetch: () => any
}

export default function UserCard({
  user,
  access,
  current_user,
  refetch,
}: Props) {
  const {
    trigger: triggerLike,
    isMutating,
    data,
  } = useSWRMutation('/api/follow', followToggleAPI)

  useEffect(() => {
    if (data && !isMutating) {
      refetch()
    }
  }, [data, isMutating])

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
      overflow={'hidden'}
      p={3}
      mb={10}
    >
      <Flex justify="space-between">
        <HStack alignItems={'center'}>
          <Heading
            fontSize={'lg'}
            fontFamily={'body'}
            textTransform={'capitalize'}
          >
            {user.first_name + ' ' + user.last_name}
          </Heading>
        </HStack>

        <HStack alignItems={'center'}>
          <Button
            isLoading={isMutating}
            onClick={() =>
              triggerLike({
                id: user.id,
                accessToken: access,
              })
            }
            colorScheme={
              user.followers.includes(current_user) ? 'red' : 'purple'
            }
          >
            {user.followers.includes(current_user) ? 'Unfollow' : 'Follow'}
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}
