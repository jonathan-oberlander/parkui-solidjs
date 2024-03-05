import { ParentComponent } from 'solid-js'
import { hstack } from 'styled-system/patterns/hstack'
import { Link } from '~/components/ui'

export const Nav: ParentComponent = props => (
  <>
    <nav class={hstack()}>
      <Link href="/login">Logout</Link>
      <Link href="/nav/users/123">Users</Link>
    </nav>
    <section>{props.children}</section>
  </>
)
