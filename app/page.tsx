import Image from 'next/image'
import NanniWrapper from '@/components/NanniButton/wrapper'
import next from '../public/next.svg'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <div className='w-full h-full' style={{backgroundImage: 'url("Background.jpg")', backgroundSize: "cover"}}>
<<<<<<< HEAD
      <div className="absolute right-6 top-4 text-6xl" style={{ 'font-family': 'Comic Sans MS' }}>SAKARI VILLAPAITAPELI</div>
=======
      <div className="absolute right-6 top-4 text-6xl" style={{ 'fontFamily': 'Comic Sans MS' }}>SAKARIN VILLAPAITAPELI</div>
>>>>>>> 541ef1dd29e22b13086eb00963ea22846649cb11
        <div className='grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[3fr_1fr] h-full w-full'>
            <NanniWrapper/>
            <Chat />
        </div>
    </div>
  )
}