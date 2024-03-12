import { Title } from '@solidjs/meta'
import {
  AtSign,
  CheckIcon,
  ChevronsUpDownIcon,
  Cloud,
  Pyramid,
} from 'lucide-solid'
import { ParentComponent } from 'solid-js'
import { Container, Flex, HStack } from 'styled-system/jsx'
import { hstack } from 'styled-system/patterns/hstack'
import { Link, Select, Tabs, Text } from '~/components/ui'

const items = [
  { label: 'alicia@example.com', value: 'alicia@example.com', Icon: AtSign },
  { label: 'alicia@cloud.com', value: 'alicia@cloud.com', Icon: Cloud },
  { label: 'alicia@pyramid.com', value: 'alicia@pyramid.com', Icon: Pyramid },
]

export const Inbox: ParentComponent = props => (
  <Container h="100vh">
    <Title>Inbox</Title>
    <nav class={hstack()}>
      <Link href="/signup">Sign Up</Link>
    </nav>
    <section>
      <Flex p="4" h="800px">
        <HStack w="full" gap="0">
          {/* col a */}
          <Flex h="full" w="xs" border="1px solid gray">
            <UserSelect items={items} />
          </Flex>
          <Flex h="full" flex="1" border="1px solid gray">
            <HStack h="16" w="full" justifyContent="center">
              <Text>Inbox</Text>
              <TabFilter />
            </HStack>
          </Flex>
          <Flex h="full" flex="1" border="1px solid gray">
            <Text>COL C</Text>
          </Flex>
        </HStack>
      </Flex>
    </section>
  </Container>
)

const UserSelect = (props: Select.RootProps) => {
  return (
    <Select.Root
      positioning={{ sameWidth: true }}
      width="2xs"
      {...props}
      items={props.items}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Alicia Kosh" />
          <ChevronsUpDownIcon />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup id="framework">
            {items.map(item => (
              <Select.Item key={item.value} item={item}>
                <item.Icon size={16} strokeWidth={1} />
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

export const TabFilter = (props: Tabs.RootProps) => {
  const options = [
    { id: 'all', label: 'All Mail' },
    { id: 'unread', label: 'Unread' },
  ]

  return (
    <Tabs.Root defaultValue="all" variant="enclosed" {...props}>
      <Tabs.List>
        {options.map(option => (
          <Tabs.Trigger key={option.id} value={option.id}>
            {option.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="all">All</Tabs.Content>
      <Tabs.Content value="unread">Un read</Tabs.Content>
    </Tabs.Root>
  )
}
