import { ReactNode } from 'react'
import {
  Box,
  Text,
  Stack,
  HStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

interface Props {
  children?: ReactNode
  title?: string
  subTitle?: string
  description?: string
}

export default function PostCard({
  title,
  subTitle,
  children,
  description,
}: Props) {
  return (
    <Box
      w={'full'}
      minH={'200px'}
      bg={useColorModeValue('white', 'gray.800')}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
      overflow={'hidden'}
      p={6}
      mb={10}
    >
      <Stack mb={title ? 5 : 0}>
        {title && (
          <HStack alignItems={'center'}>
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              textTransform={'capitalize'}
            >
              {title}
            </Heading>
          </HStack>
        )}

        {subTitle && (
          <Text fontWeight={600} color={'gray.500'} fontSize="md">
            {subTitle}
          </Text>
        )}
      </Stack>

      <Text fontWeight={600} color={'gray.500'}>
        {description}
      </Text>
      {children}
    </Box>
  )
}
