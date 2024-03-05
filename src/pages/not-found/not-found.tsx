import { useNavigate } from '@solidjs/router'
import { Center, Container, Stack } from 'styled-system/jsx'
import { Button, Text } from '~/components/ui'

function Back() {
  const navigate = useNavigate()
  return (
    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
      Back
    </Button>
  )
}

export const NotFound = () => {
  return (
    <Container h="100vh">
      <Center h="full" justifyContent="center">
        <Stack>
          <Text>404 - Not found!</Text>
          <Back />
        </Stack>
      </Center>
    </Container>
  )
}
