import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Register as a resident',
    description: 'Register as a resident of the hall',
}
  
export default function ResidentLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return children
}