import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'
import { priceFormatter } from '@/utils/formatter'
import useSummary from '@/hooks/useSummary'

export async function Summary() {
  const summary = await useSummary()

  return (
    <section className="w-full lg:max-w-[1120px] mx-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-36">
      <div className="bg-gray-600 rounded-lg p-8 shadow-2xl lg:max-h-[137px]">
        <header className="flex items-center justify-between text-gray-100">
          <span>Entradas</span>
          <ArrowUpCircle size={32} color="#00b37e" />
        </header>
        <strong className="block mt-4 text-2xl text-white">
          {priceFormatter.format(summary.income)}
        </strong>
      </div>

      <div className="bg-gray-600 rounded-lg p-8 shadow-2xl lg:max-h-[137px]">
        <header className="flex items-center justify-between text-gray-100">
          <span>Saídas</span>
          <ArrowDownCircle size={32} color="#f75a68" />
        </header>
        <strong className="block mt-4 text-2xl text-white">
          {priceFormatter.format(summary.outcome)}
        </strong>
      </div>

      <div className="bg-green-500 rounded-lg p-8 shadow-2xl lg:max-h-[137px]">
        <header className="flex items-center justify-between text-white">
          <span>Total</span>
          <DollarSign size={32} color="#fff" />
        </header>
        <strong className="block mt-4 text-2xl text-white">
          {priceFormatter.format(summary.total)}
        </strong>
      </div>
    </section>
  )
}
