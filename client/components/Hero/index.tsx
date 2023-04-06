import { Flex, Container, Heading, Stack, Text, Button } from '@chakra-ui/react'

import Illustration from './Illustration'

export default function Hero() {
  return (
    <>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Tweet News{' '}
            <Text as={'span'} color={'purple.400'}>
              made easy
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning.
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              px={6}
              colorScheme={'purple'}
              bg={'purple.400'}
              _hover={{ bg: 'purple.500' }}
            >
              Get started
            </Button>
            <Button px={6}>Learn more</Button>
          </Stack>
          <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex>
        </Stack>
      </Container>
    </>
  )
}
