import Image from 'next/image'
import next from '../public/next.svg'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <div className='w-full h-full flex'>
        <div className='flex flex-row w-full'>
          <Image
              className="flex flex-grow"
              src="/../public/Sakari.png"
              alt="Sakke"
              width={600}
              height={100}
              priority
            />
            <div className='flex flex-grow-0'>
              <h1>Sakarin villapaitapeli</h1>
              <Chat />
            </div>
        </div>
    </div>
  )
}