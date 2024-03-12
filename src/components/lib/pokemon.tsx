import { Button, Text } from '~/components/ui'

import {
  Accessor,
  ErrorBoundary,
  For,
  Suspense,
  createResource,
  createSignal,
  useTransition,
} from 'solid-js'
import { css } from 'styled-system/css'
import { toast } from '~/components/lib'
import { SpinnerDots } from '../icon'

export const pageSize = 20

export const Pokefetch = () => {
  const [offset, setOffset] = createSignal(0)
  const [isPending, startTransition] = useTransition()

  const updateOffset = () => {
    startTransition(() => setOffset(o => o + pageSize))
  }

  return (
    <ErrorBoundary
      fallback={(error, reset) => {
        toast().create({
          title: error.name,
          description: error.message,
          id: 'poke-error',
        })

        return (
          <>
            <Button type="button" variant="outline" onClick={reset}>
              Reset
            </Button>
            <Text color="red">{error.message}</Text>
          </>
        )
      }}
    >
      <Button type="button" variant="outline" onClick={updateOffset}>
        {isPending() ? <SpinnerDots /> : 'Next'}
      </Button>
      <Suspense fallback={<p>loading...</p>}>
        <div
          style={{
            opacity: isPending() ? 0.2 : 1,
            transition: 'all 200ms',
          }}
        >
          <PokemonCollection offset={offset} />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

const PokemonCollection = (props: { offset: Accessor<number> }) => {
  const [data] = createResource(props.offset, fetchPokemon)

  return (
    <ol
      start={props.offset() + 1}
      class={css({
        listStyleType: 'decimal',
        listStylePosition: 'inside',
      })}
    >
      <For each={data()}>
        {pokemon => (
          <li>
            <a href={pokemon.url} target="_blank" rel="noreferrer">
              {pokemon.name}
            </a>
          </li>
        )}
      </For>
    </ol>
  )
}

let requestNumber = 0

export const fetchPokemon = async (key: number) => {
  requestNumber++

  const offset = parseInt(String(key).split('-')[0])

  await new Promise(r => setTimeout(r, 500))

  if (requestNumber % 3 === 0) {
    throw new Error('An error occured')
  }

  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${offset}`,
  )

  const json = (await data.json()) as PokeRes

  return json.results
}

const mockresponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
}

type PokeRes = typeof mockresponse
