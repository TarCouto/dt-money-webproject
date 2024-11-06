'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-4 lg:scroll-pl-12 lg:px-0  max-w-[300px] lg:max-w-[1280px] items-center"
    >
      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Buscar uma transacao..."
        className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500 flex-1"
      />

      <button
        type="submit"
        className="flex items-center bg-transparent border border-green-300 text-green-300 font-bold rounded-lg lg:p-4 p-2 transition-colors duration-200 hover:bg-green-500 hover:border-green-500 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed lg:min-w-[147px]"
      >
        <MagnifyingGlass size={20} className="mr-2" />
        Buscar
      </button>
    </form>
  )
}
