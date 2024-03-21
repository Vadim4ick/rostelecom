'use client'

import { useGate } from 'effector-react'
import { BestsellerGoods } from '@/components/modules/MainPage/BestsellerGoods'
import { Categories } from '@/components/modules/MainPage/Categories/Categories'
import { Hero } from '@/components/modules/MainPage/Hero/Hero'
import { MainPageGate } from '@/context/goods'
import { NewGoods } from '@/components/modules/MainPage/NewGoods'
import { BrandLife } from '@/components/modules/MainPage/BrandLife'

const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero />
      <Categories />
      <NewGoods />
      <BestsellerGoods />

      <BrandLife />
    </main>
  )
}

export { MainPage }
