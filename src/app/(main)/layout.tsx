import type { Metadata } from 'next'

import { AuthProvider,  ViewProvider } from '@/providers'
import Sidebar from '@/components/navigation/sidebar'
import PageTitle from '@/components/core/page-title'

export const metadata: Metadata = {
    title: 'VNK Management',
    description: '',
}


export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ViewProvider>
            <AuthProvider>
                <main className='w-full h-screen flex max-h-screen max-w-screen'>
                    <Sidebar />
                    <section className='w-full h-full flex flex-col max-h-full  overflow-hidden'>
                        <PageTitle />
                        <div className='p-6 flex flex-col flex-1 overflow-auto'>
                        {children}
                        </div>
                    </section>
                </main>
            </AuthProvider>
        </ViewProvider>
    )
}