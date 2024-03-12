import { Title } from '@solidjs/meta'
import { Center, Container, Divider, Stack } from 'styled-system/jsx'
import { Pokefetch } from '~/components/lib/pokemon'
import { SignUpCard } from '~/pages/sign-up/card'

export const SignUp = () => {
  return (
    <>
      <Title>Signup</Title>
      <Container py={{ base: '16', md: '24' }}>
        <Center>
          <Stack>
            <SignUpCard />
          </Stack>
        </Center>
      </Container>
      <Divider />
      <Container>
        <Pokefetch />
      </Container>
    </>
  )
}
