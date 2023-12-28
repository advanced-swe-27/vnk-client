"use client"
import CreateKeyLogDialog from "@/components/dialogs/create-key-log-dialog";
import { keyLogColumns } from "@/components/table/colums";
import { useLocalStorage } from "react-use";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import CustomError from "@/components/core/custom-error";
import { GET_ALL_KEY_LOGS } from "@/utils/server/key-log";
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
import KeyLogsByRoom from "./key-logs-by-room";
import KeyLogsByStatus from "./key-logs-by-status";
import { Button } from "@/components/ui/button";

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


export default function KeyLogsPage() {
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

    const allKeyLogsQuery = useQuery({
        queryKey: ['key-logs'],
        queryFn: async () => {
            if (user && user.token) {
                const leyLogs = await GET_ALL_KEY_LOGS(user.token)
                return leyLogs
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })

    const allRoomsQuery = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            if (user && user.token) {
                const rooms = await GET_ROOMS()
                return rooms
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })



    useEffect(() => {
        if (allRoomsQuery.data !== undefined || !allRoomsQuery.isError) {
            const newRooms = allRoomsQuery.data?.map(room => ({
                value: room._id,
                label: room.num
            }))
            setTrimmedRooms(newRooms || [])
        }

    }, [allRoomsQuery.data, allRoomsQuery.isError]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    function generateRoomParam(name: string, val: string) {
        const qs = createQueryString(name, val)
        return router.push(`${pathname}?${qs}`)
    }

    if (searchParams && !!roomSearchParam) {
        return <KeyLogsByRoom />
    }

    if (allKeyLogsQuery.isPending) {
        return (
            <section className="flex items-center justify-center w-full h-full">
                <CustomLoader />
            </section>

        )
    }

    if (searchParams && !!statusSearchParam) {
        return <>
            {
                (allKeyLogsQuery.isError || allKeyLogsQuery.data === undefined) ? <CustomError /> :
                    <KeyLogsByStatus
                        data={allKeyLogsQuery.data}
                    />
            }
        </>
    }

    return (
        <div className="h-full">
            <div className="grid grid-cols-3 gap-4">
                <CreateKeyLogDialog />

                <Popover open={openStatus} onOpenChange={setOpenStatus}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openStatus}
                            className="w-full justify-between"
                        >
                            {status
                                ? keyLogStatus?.find((item) => item.value === status)?.label
                                : "Filter By Status..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search status..." />
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                                {keyLogStatus?.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={(currentValue) => {
                                            generateRoomParam("status", currentValue)
                                            setStatus(currentValue === status ? "" : currentValue)
                                            setOpenStatus(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                roomId === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {roomId
                                ? trimmedRooms?.find((item) => item.value === roomId)?.label
                                : "Filter By Room..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search room..." />
                            <CommandEmpty>No room found.</CommandEmpty>
                            <CommandGroup>
                                {trimmedRooms?.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={(currentValue) => {
                                            generateRoomParam("room", currentValue)
                                            setRoomId(currentValue === roomId ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                roomId === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <>
                {
                    (allKeyLogsQuery.isError || allKeyLogsQuery.data === undefined) ? <CustomError /> :
                        <DataTable
                            filterableCol="room"
                            columns={keyLogColumns}
                            data={allKeyLogsQuery.data} title="rooms" />
                }
            </>
        </div>
    )
}