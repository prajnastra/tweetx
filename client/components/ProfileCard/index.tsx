import {
  Box,
  Center,
  Text,
  Stack,
  HStack,
  Heading,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdVerified } from 'react-icons/md'

interface Props {
  name: string
  user_type: string
  avatar?: string
}

export default function ProfileCard({
  name,
  user_type,
  avatar = '/avatar.png',
}: Props) {
  return (
    <Center py={6}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        p={6}
      >
        <HStack spacing="5">
          <Image
            src={avatar}
            alt="Avatar"
            width="100px"
            height="100px"
            borderRadius="full"
          />
          <Stack>
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              display="flex"
              gap={1}
              alignItems="center"
            >
              <span>{name}</span>
              <MdVerified fontSize="1.3rem" />
            </Heading>
            <Text fontWeight={600} color={'gray.500'}>
              {user_type}
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Center>
  )
}
