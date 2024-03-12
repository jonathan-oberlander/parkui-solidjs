import {
  type ParentComponent,
  createEffect,
  onCleanup,
  onMount,
} from 'solid-js'

import { Link, Meta, MetaProvider } from '@solidjs/meta'
import { Toaster } from './components/lib'

export const App: ParentComponent = props => {
  const mql = matchMedia('(prefers-color-scheme: light)')

  const setColorMode = () => {
    document.documentElement.setAttribute(
      'data-color-mode',
      mql.matches ? 'light' : 'dark',
    )
  }

  onMount(setColorMode)
  createEffect(() => mql.addEventListener('change', setColorMode))
  onCleanup(() => mql.removeEventListener('change', setColorMode))

  return (
    <MetaProvider>
      <Link rel="canonical" href="http://solidjs.com/" />
      <Meta name="example" content="whatever" />
      {props.children}
      <Toaster />
    </MetaProvider>
  )
}
