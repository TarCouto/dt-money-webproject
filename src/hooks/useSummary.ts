import { getTransactions, Transaction } from '@/utils/getTransactions' // Ajuste o caminho conforme necessário

interface Summary {
  income: number
  outcome: number
  total: number
}

export default async function useSummary(): Promise<Summary> {
  const { transactions }: { transactions: Transaction[] } =
    await getTransactions() // Busca as transações

  const income = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income'
      ? acc + parseFloat(transaction.price)
      : acc
  }, 0)

  const outcome = transactions.reduce((acc, transaction) => {
    return transaction.type === 'outcome'
      ? acc + parseFloat(transaction.price)
      : acc
  }, 0)

  return {
    income,
    outcome,
    total: income - outcome,
  }
}
