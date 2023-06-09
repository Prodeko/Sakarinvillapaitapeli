import Image from 'next/image'
import NanniWrapper from '@/components/NanniButton/wrapper'
import next from '../public/next.svg'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <div className='w-full h-full'>
        <div className='flex flex-row h-full w-full'>
            <NanniWrapper />
            <div>
            <h1>Sakarin villapaitapeli</h1>
            <Chat></Chat>
            </div>
        </div>
    </div>
  )
}