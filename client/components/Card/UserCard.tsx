import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

import { User } from '@/api/types'

interface Props {
  user: User
}

export default function UserCard({ user }: Props) {
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
          <Button colorScheme="purple">Follow</Button>
          <Button colorScheme="red">Unfollow</Button>
        </HStack>
      </Flex>
    </Box>
  )
}
