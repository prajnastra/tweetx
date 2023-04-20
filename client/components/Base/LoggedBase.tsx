import { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'

import Footer from '../Footer'
import Navbar from '../Navbar'
import { SessionExtended } from '../../types'

interface Props {
  signOut: () => any
  hideFooter?: boolean
  session: SessionExtended | null
  children: ReactNode
}

export function LoggedBase({
  children,
  session,
  signOut,
  hideFooter = false,
}: Props) {
  return (
    <>
      <Navbar session={session} signOut={signOut} />
      <Container maxW={'7xl'}>{children}</Container>

      {!hideFooter && <Footer />}
    </>
  )
}
