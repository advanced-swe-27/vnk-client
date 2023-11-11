import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"




export default function Home() {
  return (
    <main className='flex flex-col gap-4 items-center justify-center h-screen container'>
      <p className='text-xl md:text-3xl font-bold tracking-tighter text-center'>
        Welcome to the <br />
        <span className='text-4xl md:text-6xl bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-transparent bg-clip-text'>
          Visitor&apos;s and Key Management System
        </span>
      </p>
      <Link href="/help">
        <Button>
          See Dev Resources
        </Button>
      </Link>

      <Alert className='absolute bottom-8 mx-auto max-w-lg'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Please don&apos;t edit this page until an issue has been created on it
        </AlertDescription>
      </Alert>
    </main>
  )
}
