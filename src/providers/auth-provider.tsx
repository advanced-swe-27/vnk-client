"use client"
import { useLocalStorage } from 'react-use';
import {  UserRes } from '../types';
import LoginForm from '../components/forms/login-form';



export default function AuthProvider({ children }: { children: React.ReactNode; }) {
    const [ localUser, setLocalUser, ] = useLocalStorage<UserRes | null>("user", null )

    console.log(localUser)

    if (!localUser) {
        return <LoginForm />
    }

    return (
        <>
            {children}
        </>
    )
}