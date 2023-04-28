import { ReactNode } from 'react'
import {
  Box,
  IconButton,
  Text,
  Stack,
  HStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa'

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

      <Text fontWeight={600} color={'gray.500'} mb={3}>
        {description}
      </Text>
      {children}

      <Stack direction={'row'} gap={5}>
        <IconButton variant="ghost" aria-label="Like" icon={<FaThumbsUp />} />
        <IconButton variant="ghost" aria-label="Comment" icon={<FaComment />} />
        <IconButton variant="ghost" aria-label="Share" icon={<FaShare />} />
      </Stack>
    </Box>
  )
}
