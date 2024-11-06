// getTransactions.ts

import { api } from '@/data/api'

// Definindo a interface para uma transação
export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: string // Mantenha como string se os preços estão chegando assim
  createdat: string // Ajuste para 'createdAt' se necessário
}

// Definindo a interface para a resposta da API
interface TransactionsResponse {
  transactions: Transaction[]
}

// Função para buscar as transações
export async function getTransactions(): Promise<TransactionsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simula um delay de 7 segundos

  const response = await api('/transactions', {
    next: {
      revalidate: 60 * 60, // Revalida a cada 1 hora
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch transactions')
  }

  const data: TransactionsResponse = await response.json() // Tipando a resposta

  return data
}
