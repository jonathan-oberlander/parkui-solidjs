import { JSX, splitProps } from 'solid-js'
import { Stack } from 'styled-system/jsx'
import { Input, Text } from '../ui'

type TextInputProps = {
  name: string
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date'
  label?: string
  placeholder?: string
  value: string | undefined
  error: string
  required?: boolean
  ref: (element: HTMLInputElement) => void
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
  onChange: JSX.EventHandler<HTMLInputElement, Event>
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
}

export function TextInput(props: TextInputProps) {
  const [, inputProps] = splitProps(props, ['value', 'label', 'error'])

  return (
    <Stack gap="1.5">
      {props.label && (
        <label for={props.name}>
          {props.label} {props.required && <span>*</span>}
        </label>
      )}
      <Input
        {...inputProps}
        id={props.name}
        value={props.value ?? ''}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      <Text size="sm" color="mauve.10" id={`${props.name}-error`}>
        {props.error && <em>{props.error}</em>}
      </Text>
    </Stack>
  )
}
