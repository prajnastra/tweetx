import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'

export default function CreatePost() {
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
        as="form"
      >
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Tweet</FormLabel>
            <Textarea placeholder="Write something" />
          </FormControl>

          <Stack spacing={10}>
            <Button colorScheme="purple" type="submit">
              Post
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}
