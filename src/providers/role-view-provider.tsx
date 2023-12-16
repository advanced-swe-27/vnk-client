"use client"
import LoginForm from '@/components/forms/login-form';
import { UserRes, UserRoles } from '@/types';
import { useLocalStorage } from 'react-use';

type Props = {
    children: React.ReactNode
    role: UserRoles
}

export default function RoleViewProvider({ children, role }: Props) {
    const [localUser, setLocalUser,] = useLocalStorage<UserRes | null>("user", null)

    if (!localUser) {
        return <LoginForm />
    }

    const canViewAdmin = (localUser.role === "ADMIN" || localUser.role === "SUDO")
    const canViewSudo = localUser.role === "SUDO"

    if ((role === "ADMIN" && !canViewAdmin) || (role === "SUDO" && !canViewSudo)) {
        return (
            <div className="w-full h-full flex items-center justify-center gap-4 flex-col">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[80px] h-[80px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>


                <h1 className="font-medium  tracking-tighter text-2xl">
                    This page is a protected page
                </h1>
                <p className=" max-w-lg text-center text-sm text-neutral-500">
                    This page or view is only visible to { role === "ADMIN" ? "ADMIN and SUDO" : "SUDO"} accounts only. You are currently a {localUser.role} account holder. Contact a SUDO account holder to upgrade to your permission status
                </p>

            </div>
        )
    }


    return children
}
