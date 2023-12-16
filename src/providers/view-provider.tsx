"use client"
import { useMedia } from 'react-use';
import { useState, useEffect } from "react"
import CustomLoader from '../components/loaders/custom-loader';

export default function ViewProvider({ children }: { children: React.ReactNode; }) {
    const [isClient, setIsClient] = useState(false)
    const isWide = useMedia('(min-width: 1080px)', false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <CustomLoader />
            </div>
        )
    }

    if (isClient && !isWide) {
        return (
            <div className='w-full h-screen flex items-center justify-center flex-col'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className='text-center'>
                    Your screen size is too small to view this page.
                    Try opening on a laptop instead.
                </p>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}