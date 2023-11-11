import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex items-center justify-center h-screen container'>
      <p className='text-xl md:text-3xl font-bold tracking-tighter text-center'>
        Welcome to the <br />
        <span className='text-4xl md:text-6xl bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-transparent bg-clip-text'>
          Visitor&apos;s and Key Management System
        </span>
      </p>
    </main>
  )
}
