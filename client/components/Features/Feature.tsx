import { chakra, GridItem } from '@chakra-ui/react'

interface FeatureProps {
  heading: string
  text: string
}

export default function Feature({ heading, text }: FeatureProps) {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  )
}
