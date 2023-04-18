import type { GetServerSideProps } from 'next'

import { signOut, getSession } from 'next-auth/react'

import {
  SimpleGrid,
  Alert,
  AlertIcon,
  Text,
  IconButton,
} from '@chakra-ui/react'
import {
  SettingsIcon,
  InfoIcon,
  CalendarIcon,
  CopyIcon,
} from '@chakra-ui/icons'

import { LoggedBase as Base } from '@/components/Base'
import Card from '@/components/Card'
import ProfileCard from '@/components/ProfileCard'
import { SessionExtended } from '@/types'

interface Props {
  session: SessionExtended
}

export default function Dashboard({ session }: Props) {
  return (
    <Base session={session} signOut={signOut}>
      <ProfileCard
        name={session.user.first_name}
        user_type={session.user.user_type}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mb={'10rem'}>
        <Card title="Settings" Icon={SettingsIcon}>
          <Alert status="info">
            <AlertIcon />
            This feature will be added soon...
          </Alert>
        </Card>

        <Card title="Profile details" Icon={InfoIcon}>
          <Text fontWeight={600} color={'gray.500'}>
            Id: {session.user.id}
            <IconButton
              aria-label="Copy id"
              icon={<CopyIcon />}
              size="xs"
              ml={2}
              onClick={() => {
                navigator.clipboard.writeText(session.user.id)
              }}
            />
          </Text>
          <Text fontWeight={600} color={'gray.500'}>
            Email: {session.user.email}
            <IconButton
              aria-label="Copy email"
              icon={<CopyIcon />}
              size="xs"
              ml={2}
              onClick={() => {
                navigator.clipboard.writeText(session.user.email)
              }}
            />
          </Text>
        </Card>

        <Card title="Activities" Icon={CalendarIcon}>
          <Alert status="info">
            <AlertIcon />
            This feature will be added soon...
          </Alert>
        </Card>
      </SimpleGrid>
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
