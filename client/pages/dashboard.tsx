import {
  Container,
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

import Base from '@/components/Base'
import Card from '@/components/Card'
import ProfileCard from '@/components/ProfileCard'

export default function Dashboard() {
  return (
    <Base>
      <ProfileCard name="Abhijit" user_type="ADMIN" />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mb={'10rem'}>
        <Card title="Settings" Icon={SettingsIcon}>
          <Alert status="info">
            <AlertIcon />
            This feature will be added soon...
          </Alert>
        </Card>

        <Card title="Profile details" Icon={InfoIcon}>
          <Text fontWeight={600} color={'gray.500'}>
            Id: {'dfdfjh2323'}
            <IconButton
              aria-label="Copy id"
              icon={<CopyIcon />}
              size="xs"
              ml={2}
              onClick={() => {
                navigator.clipboard.writeText('abhijit@example.com')
              }}
            />
          </Text>
          <Text fontWeight={600} color={'gray.500'}>
            Email: {'abhijit@example.com'}
            <IconButton
              aria-label="Copy email"
              icon={<CopyIcon />}
              size="xs"
              ml={2}
              onClick={() => {
                navigator.clipboard.writeText('abhijit@example.com')
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
