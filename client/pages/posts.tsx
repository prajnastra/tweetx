import type { GetServerSideProps } from 'next'

import useSWR from 'swr'
import { signOut, getSession } from 'next-auth/react'

import { Box, Stack } from '@chakra-ui/react'

import CreatePost from '@/components/CreatePost'
import { LoggedBase as Base } from '@/components/Base'
import { PostCard } from '@/components/Card'
import Loader from '@/components/Loader'

import { SessionExtended } from '@/types'
import { getAllPostsAPI } from '@/api'

interface Props {
  session: SessionExtended
}

export default function Posts({ session }: Props) {
  const { data, error, isLoading } = useSWR('/api/posts', (url) =>
    getAllPostsAPI(url, session.accessToken)
  )
  return (
    <Base session={session} signOut={signOut} hideFooter={true}>
      <Stack spacing={10} mb={'10rem'} direction={['column', 'row']}>
        <Box flex={2} overflowY="auto" maxHeight="85vh" p={5}>
          {isLoading && <Loader minH="200px" />}

          {data &&
            data.map((post) => (
              <PostCard
                key={post.id}
                title={post.owner_name}
                description={post.content}
              />
            ))}
        </Box>

        <Box flex={1}>
          <CreatePost accessToken={session.accessToken} />
        </Box>
      </Stack>
    </Base>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
