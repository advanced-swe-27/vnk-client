import type { Metadata } from 'next'

import { AuthProvider, ContextProvider, ViewProvider } from '@/providers'

export const metadata: Metadata = {
    title: 'Auth | VNK Management',
    description: 'Manager Dashboard for wastify',
}


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ViewProvider>
            <main className="w-screen bg-black/5 h-screen overflow-hidden flex flex-col gap-4 items-center justify-center">
                {children}
            </main>
        </ViewProvider>
    )
}