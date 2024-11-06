import { getTransactions, Transaction } from '@/utils/getTransactions'
import { columns } from './columns'
import { DataTable } from './data-table'

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: '728ed52f1',
//       amount: 100,
//       status: 'pending',
//       email: 'a@example.com',
//       test: 'teste1',
//     },
//     {
//       id: '728ed52f2',
//       amount: 200,
//       status: 'pending',
//       email: 'b@example.com',
//       test: 'teste1',
//     },
//     {
//       id: '728ed52f3',
//       amount: 400,
//       status: 'pending',
//       email: 'c@example.com',
//       test: 'teste1',
//     },
//     {
//       id: '728ed52f4',
//       amount: 800,
//       status: 'pending',
//       email: 'd@example.com',
//       test: 'teste1',
//     },
//     {
//       id: '728ed52f5',
//       amount: 900,
//       status: 'pending',
//       email: 'm@example.com',
//       test: 'teste1',
//     },
//     // ...
//   ]
// }

export default async function DemoPage() {
  const { transactions }: { transactions: Transaction[] } =
    await getTransactions()
  console.log(transactions)

  return (
    <div className="container mx-auto px-5 min-h-screen">
      <DataTable columns={columns} data={transactions} />
    </div>
  )
}
