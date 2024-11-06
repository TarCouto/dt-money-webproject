'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Transaction } from '@/utils/getTransactions'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-white"
        >
          Descricao
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => <div className=" text-white">Amount</div>,
    cell: ({ row }) => {
      // Extrair o valor do preço como string e convertê-lo em número
      const priceString = row.getValue('price') as string
      const price = parseFloat(priceString)

      // Formatar o valor como moeda brasileira
      const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)

      // Obter o tipo de transação ('income' ou 'outcome') para aplicar estilo condicional
      const transactionType = row.original.type

      // Definir classe condicional para a cor com base no tipo de transação
      const priceClass =
        transactionType === 'income' ? 'text-green-400' : 'text-red-300'

      return (
        <div className={` font-medium ${priceClass}`}>{formattedPrice}</div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-white">Category</div>,
  },
  {
    accessorKey: 'createdat',
    header: () => <div className="text-white">Data</div>,
    cell: ({ row }) => {
      // Obtendo a data da API no formato ISO 8601
      const dateString = row.getValue('createdat') as string

      // Convertendo a string de data para um objeto Date
      const date = new Date(dateString)

      // Formatando a data para o formato 'dd/MM/yyyy'
      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date)

      return <div className="text-white">{formattedDate}</div>
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(transaction.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem className="text-red-300">
              Delete Transacation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
