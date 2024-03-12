import {
  FormError,
  SubmitHandler,
  createForm,
  valiForm,
} from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'

import { Stack, VStack, styled } from 'styled-system/jsx'
import * as v from 'valibot'

import { TextInput } from '~/components/form'
import { SpinnerDots } from '~/components/icon'
import { toast } from '~/components/lib'
import { Button, Card, Text } from '~/components/ui'

const LoginSchema = v.object({
  email: v.string([
    v.minLength(1, 'Please enter your email.'),
    v.email('The email address is badly formatted.'),
  ]),
  password: v.string([
    v.minLength(8, 'your password is too short'),
    v.maxLength(30, 'your password is too long'),
    v.regex(/[a-z]/, 'your password must contain a lowercase letter'),
    v.regex(/[A-Z]/, 'your password must contain a uppercase letter'),
    v.regex(/[0-9]/, 'your password must contain a number'),
  ]),
})

type LoginForm = v.Input<typeof LoginSchema>

class LoginError extends Error {
  constructor(
    public name: string,
    public message: string,
    public values: Partial<LoginForm>,
  ) {
    super(message)
  }
}

const fakeEndpoint = (values: LoginForm) =>
  new Promise<LoginForm>((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0) {
        resolve(values)
      } else {
        reject(
          new LoginError('Login Error', 'An error has occurred.', {
            email: 'email has been blacklisted',
          }),
        )
      }
    }, Math.random() * 200),
  )

export const SignUpCard = () => {
  const navigate = useNavigate()

  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginForm> = async (values, event) => {
    event.preventDefault()

    try {
      const response = await fakeEndpoint(values)
      navigate('/inbox', { state: { response } })
    } catch (error) {
      if (error instanceof LoginError) {
        toast().create({
          title: error.name,
          description: error.message,
          id: 'login-error',
        })
        throw new FormError<LoginForm>(error.message, error.values)
      }
    }
  }

  const animation = {
    animation: 'appear',
    animationDuration: '500ms',
    animationDelay: '0',
  }

  return (
    <styled.div {...animation}>
      <Card.Root maxW="sm">
        <Card.Header>
          <Card.Title>Sign Up</Card.Title>
          <Card.Description>
            Create an account and discover the worlds' best UI component
            framework.
          </Card.Description>
        </Card.Header>
        <Form onSubmit={onSubmit}>
          <Card.Body>
            <Stack gap="4">
              <Field name="email">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="email"
                    label="Email"
                    value={field.value ?? ''}
                    error={field.error}
                    placeholder="Your email"
                    required
                  />
                )}
              </Field>
              <Field name="password">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="password"
                    label="Password"
                    value={field.value ?? ''}
                    error={field.error}
                    placeholder="********"
                    required
                  />
                )}
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <VStack w="full">
              {/* <Text size="sm" color="tomato">
                {loginForm.response.message && (
                  <em>{loginForm.response.message}</em>
                )}
              </Text> */}
              <Button
                type="submit"
                width="full"
                disabled={loginForm.submitting}
              >
                {loginForm.submitting ? <SpinnerDots /> : 'Create Account'}
              </Button>
            </VStack>
          </Card.Footer>
        </Form>
      </Card.Root>
    </styled.div>
  )
}
