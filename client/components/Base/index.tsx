import { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'

import Footer from '../Footer'
import Navbar from '../Navbar'

interface Props {
  children: ReactNode
}

export default function Base({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>{children}</Container>
      <Footer />
    </>
  )
}
