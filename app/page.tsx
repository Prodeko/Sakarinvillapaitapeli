'use client'

import Image from 'next/image'
import NanniWrapper from '@/components/NanniButton/wrapper'
import next from '../public/next.svg'
import Chat from '../components/Chat'
import { useState } from 'react'

export default function Home() {
  const [isWon, setIsWon] = useState(false)
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: 'url("Background.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <div className="right-6 top-4 text-2xl sm:text-2xl md:text-8xl lg:text-8xl absolute">
        SAKARIN VILLAPAITAPELI
      </div>
      <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[3fr_1fr] h-full w-full">
        <NanniWrapper isWon={isWon}/>
        <Chat isWon={isWon} setIsWon={setIsWon} />
      </div>
    </div>
  )
}
