import { api } from '@/data/api'

// Definindo a interface para uma transação
export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: string
  createdAt: string
}

// Função para criar uma nova transação
export async function setTransactions(
  transactionData: Omit<Transaction, 'id' | 'createdAt'>,
): Promise<Transaction> {
  const response = await api('/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create a new transaction')
  }

  const newTransaction: Transaction = await response.json()
  return newTransaction
}
