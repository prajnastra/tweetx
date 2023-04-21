import type { GetServerSideProps } from 'next'

import { signOut, getSession } from 'next-auth/react'

import { Box, Stack } from '@chakra-ui/react'

import CreatePost from '@/components/CreatePost'
import { LoggedBase as Base } from '@/components/Base'
import { PostCard } from '@/components/Card'

import { SessionExtended } from '@/types'

interface Props {
  session: SessionExtended
}

export default function Posts({ session }: Props) {
  return (
    <Base session={session} signOut={signOut} hideFooter={true}>
      <Stack spacing={10} mb={'10rem'} direction={['column', 'row']}>
        <Box flex={2} overflowY="auto" maxHeight="85vh" p={5}>
          {new Array(15).fill(0).map((elem, idx) => (
            <PostCard
              key={idx}
              title="Post Title"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, officiis!"
            />
          ))}
        </Box>

        <Box flex={1}>
          <CreatePost />
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
