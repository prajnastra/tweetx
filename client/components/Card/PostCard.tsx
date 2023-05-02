import { ReactNode } from 'react'
import useSWRMutation from 'swr/mutation'
import swal from 'sweetalert'

import {
  Box,
  IconButton,
  Button,
  Text,
  Stack,
  HStack,
  Heading,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa'

import { postLikeToggleAPI } from '@/api'
import { Post } from '@/types'

interface Props {
  access: string
  post: Post
}

export default function PostCard({ access, post }: Props) {
  const { trigger: triggerLike, isMutating } = useSWRMutation(
    '/api/posts/like',
    postLikeToggleAPI
  )

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
      <Stack mb={5}>
        <HStack alignItems={'center'}>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            textTransform={'capitalize'}
          >
            {post.owner_name}
          </Heading>
        </HStack>
      </Stack>

      <Text fontWeight={600} color={'gray.500'} mb={3}>
        {post.content}
      </Text>

      <Stack direction={'row'} gap={5}>
        <Button
          variant="ghost"
          aria-label="Like"
          isLoading={isMutating}
          onClick={() =>
            triggerLike({
              id: post.id,
              accessToken: access,
            })
          }
          rightIcon={<FaThumbsUp />}
        >
          {post.likes.length}
        </Button>

        <Tooltip label="Comment feature not implemented yet">
          <IconButton
            variant="ghost"
            aria-label="Comment"
            icon={<FaComment />}
            isDisabled={true}
          />
        </Tooltip>

        <Tooltip label="Share feature not implemented yet">
          <IconButton
            variant="ghost"
            aria-label="Share"
            icon={<FaShare />}
            isDisabled={true}
          />
        </Tooltip>
      </Stack>
    </Box>
  )
}
