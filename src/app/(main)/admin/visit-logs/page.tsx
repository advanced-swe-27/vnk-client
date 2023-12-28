"use client"
import CreateVisitLogDialog from "@/components/dialogs/create-visit-log-dialog";
import { keyLogColumns, visitLogColumns } from "@/components/table/colums";
import { useLocalStorage } from "react-use";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import CustomError from "@/components/core/custom-error";
import { DataTable } from "@/components/table/data-table";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { GET_ROOMS } from "@/utils/server/room";
import { Button } from "@/components/ui/button";
import { GET_ALL_VISIT_LOGS } from "@/utils/server/visit-log";

const keyLogStatus: { value: string; label: string }[] = [
    {
        label: "Open",
        value: "open"
    },
    {
        label: "Closed",
        value: "closed"
    },
]


export default function VisitLogsPage() {
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const roomSearchParam = searchParams.get("room")
    const statusSearchParam = searchParams.get("status")

    const [open, setOpen] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    const [roomId, setRoomId] = useState("")
    const [status, setStatus] = useState("")
    const [trimmedRooms, setTrimmedRooms] = useState<{ value: string; label: string }[]>([])

    const allVisitLogsQuery = useQuery({
        queryKey: ['visit-logs'],
        queryFn: async () => {
            if (user && user.token) {
                const keyLogs = await GET_ALL_VISIT_LOGS(user.token)
                return keyLogs
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })



    if (allVisitLogsQuery.isPending) {
        return (
            <section className="flex items-center justify-center w-full h-full">
                <CustomLoader />
            </section>

        )
    }

    
    return (
        <div className="h-full">
            <div className="grid grid-cols-3 gap-4">
                <CreateVisitLogDialog />
            </div>
            <>
                {
                    (allVisitLogsQuery.isError || allVisitLogsQuery.data === undefined) ? <CustomError /> :
                        <DataTable
                            filterableCol="room"
                            columns={visitLogColumns}
                            data={allVisitLogsQuery.data} title="rooms" />
                }
            </>
        </div>
    )
}