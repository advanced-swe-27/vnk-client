import Link from 'next/link'
import { Button } from '../components/ui/button'

export default function NotFound() {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-4 flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[80px] h-[80px]  ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>


            <h1 className="font-medium  tracking-tighter text-2xl">
                This page could not be found
            </h1>
            <p className=" max-w-lg text-center text-sm text-neutral-500">
                We could not find this page in our application. It is most likely mispelt of does not exist.
            </p>

            <Link href="/">
                <Button>
                    Go back home
                </Button>
            </Link>

        </div>
    )
}