import { UserTypes } from '../../types'

import Link from 'next/link'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Link as ChakraLink,
  Container,
  Collapse,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaTwitter } from 'react-icons/fa'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

interface NavProps {
  signOut?: () => any
  session?: {
    token: string
    expires: string
    user: {
      id: string
      name: string
      email: string
      user_type: UserTypes
    }
  } | null
}

const Navbar = ({ session, signOut }: NavProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const user_type = session?.user.user_type || UserTypes.DEFAULT

  return (
    <Container maxW={'7xl'}>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.50', 'gray.900')}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              <Link href="/" legacyBehavior>
                <ChakraLink
                  display="flex"
                  gap="1"
                  textDecoration="none"
                  fontWeight="bold"
                >
                  <FaTwitter fontSize="1rem" />
                  TweetX
                </ChakraLink>
              </Link>
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav user_type={user_type} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {!session ? (
              <>
                <Button
                  rounded={'full'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Link href="/register">
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    colorScheme={'purple'}
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                rounded={'full'}
                fontSize={'sm'}
                fontWeight={400}
                colorScheme={'purple'}
                onClick={() => (signOut ? signOut() : '')}
              >
                Signout
              </Button>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav user_type={user_type} />
        </Collapse>
      </Box>
    </Container>
  )
}

export default Navbar
