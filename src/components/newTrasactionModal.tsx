'use client'
import * as Dialog from '@radix-ui/react-dialog'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import * as z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { setTransactions } from '@/utils/setTransactions'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    try {
      await setTransactions({
        description: data.description,
        type: data.type,
        category: data.category,
        price: data.price.toString(),
      })
      console.log('Transação criada com sucesso')
      reset()
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
    console.log(data)
  }

  return (
    <Dialog.Portal>
      <div className="fixed inset-0 bg-black bg-opacity-75"></div>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
          <Dialog.Title className="text-white text-2xl font-bold">
            Nova Transação
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 text-gray-100 hover:text-white transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </Dialog.Close>

          <form
            onSubmit={handleSubmit(handleCreateNewTransaction)}
            className="mt-8 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register('description')}
              className="bg-gray-900 text-gray-300 p-4 rounded-md placeholder-gray-500"
            />
            <input
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
              className="bg-gray-900 text-gray-300 p-4 rounded-md placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
              className="bg-gray-900 text-gray-300 p-4 rounded-md placeholder-gray-500"
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => field.onChange('income')}
                    className={`flex items-center justify-center p-4 rounded-md ${
                      field.value === 'income'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-100'
                    } hover:bg-gray-600`}
                  >
                    <ArrowUpIcon
                      className={`${field.value === 'income' ? 'text-white' : 'text-green-300'} w-6 h-6`}
                    />
                    Entrada
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('outcome')}
                    className={`flex items-center justify-center p-4 rounded-md ${
                      field.value === 'outcome'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                    } hover:bg-gray-600`}
                  >
                    <ArrowDownIcon
                      className={`${field.value === 'outcome' ? 'text-white' : 'text-red-300'} w-6 h-6`}
                    />
                    Saída
                  </button>
                </div>
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  )
}
