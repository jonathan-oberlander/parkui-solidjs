import {
  type ParentComponent,
  createEffect,
  onCleanup,
  onMount,
} from 'solid-js'

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

  return <>{props.children}</>
}
