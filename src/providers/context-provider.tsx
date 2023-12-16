"use client"
import { StateProvider } from "@/context/state-provider"
import reducer from "@/context/reducer"
import initialState from "@/context/initial-state"

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <StateProvider reducer={reducer} initialState={initialState}>
                {children}
            </StateProvider>
        </>
    )
}