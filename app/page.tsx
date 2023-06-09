import Image from 'next/image'
import NanniWrapper from '@/components/NanniButton/wrapper'
import next from '../public/next.svg'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <div className='w-full h-full' style={{backgroundImage: 'url("Background.jpg")', backgroundSize: "cover"}}>
        <div className='flex flex-row h-full w-full'>
            <NanniWrapper />
            <div className='flex flex-grow-0'>
              <Chat />
            </div>
        </div>
    </div>
  )
}