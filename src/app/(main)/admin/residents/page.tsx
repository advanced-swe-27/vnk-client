"use client"
import { residentColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "react-use";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import { GET_RESIDENTS } from "@/utils/server/resident";
import CustomError from "@/components/core/custom-error";
import { useCallback, useEffect, useState } from "react";
import { GET_ROOMS } from "@/utils/server/room";
import ResidentsByRoom from "./residents-by-room";
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
import ResidentsByStatus from "./residents-by-status";

const residentStatus: { value: string; label: string }[] = [
    {
        label: "Pending",
        value: "pending"
    },
    {
        label: "Approved",
        value: "approved"
    },
    {
        label: "Rejected",
        value: "rejected"
    },
]

export default function ResidentsPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const roomSearchParam = searchParams.get("room")
    const statusSearchParam = searchParams.get("status")

    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const [open, setOpen] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    const [roomId, setRoomId] = useState("")
    const [status, setStatus] = useState("")
    const [trimmedRooms, setTrimmedRooms] = useState<{ value: string; label: string }[]>([])
    const allResidentsQuery = useQuery({
        queryKey: ['residents'],
        queryFn: async () => {
            if (user && user.token) {
                const porters = await GET_RESIDENTS(user.token)
                return porters
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
                const porters = await GET_ROOMS(user.token)
                return porters
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
        return <ResidentsByRoom />
    }    

    if (allResidentsQuery.isPending || allRoomsQuery.isPending) {
        return (
            <section className="flex items-center justify-center w-full h-full">

                <CustomLoader />
            </section>

        )
    }

    if (searchParams && !!statusSearchParam) {
        return <>
            {
                (allResidentsQuery.isError || allResidentsQuery.data === undefined) ? <CustomError /> :
                    <ResidentsByStatus
                        data={allResidentsQuery.data}
                    />
            }
        </>
    }



    return (
        <div className="h-full">
            <div className="grid grid-cols-3 gap-4">

                <Popover open={openStatus} onOpenChange={setOpenStatus}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openStatus}
                            className="w-full justify-between"
                        >
                            {status
                                ? residentStatus?.find((item) => item.value === status)?.label
                                : "Filter By Status..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search status..." />
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                                {residentStatus?.map((item) => (
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
                    (allResidentsQuery.isError || allResidentsQuery.data === undefined) ? <CustomError /> :
                        <DataTable
                            filterableCol="sid"
                            columns={residentColumns}
                            data={allResidentsQuery.data} title="residents" />
                }
            </>
        </div>
    )
}