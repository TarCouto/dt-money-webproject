import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '@/components/newTrasactionModal'

export function Header() {
  return (
    <header className="bg-gray-700 w-full min-h-[212px]  pt-10 px-2 sm:px-4">
      <div className="max-w-[1120px] w-full mx-auto grid grid-cols-2 items-center gap-4 lg:gap-0 lg:grid-cols-[1fr_auto]">
        <div className="flex justify-start">
          <Image
            src={'/logo.svg'}
            alt={'logo'}
            width={172}
            height={41}
            className="w-[150px] h-auto sm:w-[172px]"
          />
        </div>
        <div className="flex justify-end">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="text-white bg-green-500 hover:bg-green-700 transition-colors duration-200 p-2 min-w-[120px] sm:min-w-[152px] min-h-[40px] sm:min-h-[50px] rounded-md">
                Nova transação
              </button>
            </Dialog.Trigger>
            <NewTransactionModal />
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
