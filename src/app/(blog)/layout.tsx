import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[375px] lg:max-w-[1440px] z-10 grid grid-cols-1 gap-y-[4.5rem] lg:grid-cols-12 mx-auto bg-gray-600">
      <div className="col-span-12 bg-blue-200">
        <Header />
      </div>
      <div className="col-span-12">{children}</div>
    </div>
  )
}
