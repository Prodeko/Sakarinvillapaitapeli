import Image from 'next/image'
import next from '../public/next.svg'

export default function Home() {
  return (
    <div className='w-full h-full flex'>
        <ErrorMessage></ErrorMessage>
        <div className='flex flex-row'>
          <Image
              className=""
              src="/../public/Sakari.png"
              alt="Sakke"
              width={600}
              height={100}
              priority
            />
            <div>
            <h1>Sakarin villapaitapeli</h1>
            <Chat></Chat>
            </div>
        </div>
    </div>
  )
}

function Chat () {
  return <div>
    <p>foobar</p>
  </div>
}

function ErrorMessage () {
  return <div className='absolute top-0 right-0 bottom-o left-0 m-auto w-full h-full'>
    <Image
                  className="absolute top-0 right-0 bottom-o left-0 m-auto"
                  src="/../public/Errormessage.jpg"
                  alt="Next.js Logo"
                  width={500}
                  height={500}
                  priority></Image>
  </div>
}