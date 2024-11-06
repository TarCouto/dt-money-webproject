import { dateFormatter, priceFormatter } from '@/utils/formatter'
import { getTransactions, Transaction } from '@/utils/getTransactions'

interface PriceHighlightProps {
  variant: 'income' | 'outcome' // Specify the possible values for variant
  children: React.ReactNode // Use React's type for children
}

const PriceHighlight: React.FC<PriceHighlightProps> = ({
  variant,
  children,
}) => (
  <span className={variant === 'income' ? 'text-green-300' : 'text-red-300'}>
    {children}
  </span>
)

export async function TableTransacations() {
  const { transactions }: { transactions: Transaction[] } =
    await getTransactions()
  return (
    <table className="w-full border-separate border-spacing-0 mb-6 mt-6 max-w-[375px] lg:max-w-[1120px] text-white">
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="py-5 px-8 bg-gray-600 rounded-l-lg first:rounded-tl-lg first:rounded-bl-lg">
              {transaction.description}
            </td>
            <td className="py-5 px-8 bg-gray-600">
              <PriceHighlight variant={transaction.type}>
                {transaction.type === 'outcome' && '- '}
                {priceFormatter.format(Number(transaction.price))}
              </PriceHighlight>
            </td>
            <td className="py-5 px-8 bg-gray-600">{transaction.category}</td>
            <td className="py-5 px-8 bg-gray-600 rounded-r-lg last:rounded-tr-lg last:rounded-br-lg">
              {dateFormatter.format(new Date(transaction.createdat))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
