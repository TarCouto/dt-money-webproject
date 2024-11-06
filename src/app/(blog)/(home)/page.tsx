import { Summary } from '@/components/summary'
import { getTransactions, Transaction } from '@/utils/getTransactions'
import { Metadata } from 'next'
import { DataTable } from '../transactions/data-table'
import { columns } from '@/app/(blog)/transactions/columns'
// import { Suspense } from 'react'
export const metadata: Metadata = {
  title: 'Home',
}

// export async function getUserIssues(): Promise<Issue[]> {
//   await new Promise((resolve) => setTimeout(resolve, 7000))
//   const response = await api('/repos/TarCouto/github-blog/issues', {
//     next: {
//       revalidate: 60 * 60, // Revalida a cada 1 hora
//     },
//   })

//   if (!response.ok) {
//     throw new Error('Failed to fetch user issues')
//   }

//   const issues = await response.json()

//   return issues
// }

export default async function Home() {
  // const issues = await getUserIssues()
  // const postsCounter = issues.length

  const { transactions }: { transactions: Transaction[] } =
    await getTransactions()
  console.log(transactions)

  return (
    <div className="lg:max-w-[1440px] max-w-[375px] w-full min-h-[860px] grid lg:grid-cols-1 grid-rows-[auto_auto] gap-10 px-10 lg:px-[160px] pb-10">
      <Summary />
      <div className=" text-black lg:max-w-[1120px] min-h-[1091px]  items-center justify-center ">
        <DataTable columns={columns} data={transactions} />
      </div>
      <div className="text-white flex items-center justify-center">
        Paginacaco
      </div>
    </div>
  )
}
