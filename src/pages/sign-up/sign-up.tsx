import { Center, Container, Stack } from 'styled-system/jsx'
import { SignUpCard } from '~/pages/sign-up/card'

export const SignUp = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Center>
        <Stack>
          <SignUpCard />
        </Stack>
      </Center>
    </Container>
  )
}

/* 
  <RadioGroup.Root size="sm">
    <RadioGroup.Indicator />
    <Index each={['React', 'Solid', 'Vue']}>
      {(framework) => (
        <RadioGroup.Item value={framework()}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{framework()}</RadioGroup.ItemText>
        </RadioGroup.Item>
      )}
    </Index>
  </RadioGroup.Root> 
*/
