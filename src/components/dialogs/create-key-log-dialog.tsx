"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import _ from "lodash"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {  UserRes, KeyLogRes, OpenKeyLogInput } from "@/types"
import { Check, Loader2, ChevronsUpDown } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { CREATE_KEY_LOG } from "@/utils/server/key-log"
import { useEffect, useState } from "react"
import { GET_ACCEPTED_RESIDENTS, GET_RESIDENTS_BY_ROOM } from "@/utils/server/resident"
import { GET_ROOMS } from "@/utils/server/room"
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

export default function CreateKeyLogDialog() {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const [trimmedRooms, setTrimmedRooms] = useState<{ value: string; label: string }[]>([])
    const [trimmedRes, setTrimmedRes] = useState<{ value: string; label: string }[]>([])
    const [open, setOpen] = useState(false)
    const [openRes, setOpenRes] = useState(false)

    const [roomId, setRoomId] = useState("")
    const [residentId, setResidentId] = useState("")

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

    const allResidentsQuery = useQuery({
        queryKey: ['residents'],
        queryFn: async () => {
            if (user && user.token) {
                const residents = await GET_ACCEPTED_RESIDENTS(user.token)
                return residents
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

    useEffect(() => {
        if (allResidentsQuery.data !== undefined || !allResidentsQuery.isError) {
            const newRes = allResidentsQuery.data?.map(resident => ({
                value: resident._id,
                label: `${resident.othernames} ${resident.surname} - R${resident?.room?.num}`
            }))
            setTrimmedRes(newRes || [])
        }

    }, [allResidentsQuery.data, allResidentsQuery.isError]);

    const changeResidentRoom = useMutation({
        mutationFn: () => {
            const info: OpenKeyLogInput = {
                openedBy: residentId,
                room: roomId
            }
            if (user && user.token) {
                return CREATE_KEY_LOG(info, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['key-logs'], (oldData: KeyLogRes[]) => {
                return [...oldData, newData]
            })
            toast.success("Created key log successfully")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Couldn't create log. Try again later")
        }
    })

    function onSubmit() {
        changeResidentRoom.mutate(undefined)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="">
                    New Key Log
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Key Log  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
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
                                    : "Select a room..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search room..." />
                                <CommandEmpty>No room found.</CommandEmpty>
                                <ScrollArea className="h-[200px]">

                                    <CommandGroup>
                                        {trimmedRooms?.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={(currentValue) => {
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
                                </ScrollArea>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Popover open={openRes} onOpenChange={setOpenRes}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openRes}
                                className="w-full justify-between"
                            >
                                {residentId
                                    ? trimmedRes?.find((item) => item.value === residentId)?.label
                                    : "Select a resident..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command className="w-full">
                                <CommandInput placeholder="Search residents by name ..." />
                                <CommandEmpty>No resident found.</CommandEmpty>
                                <ScrollArea className="h-[200px] w-full">

                                    <CommandGroup>
                                        {trimmedRes?.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={(currentValue) => {
                                                    setResidentId(currentValue === residentId ? "" : currentValue)
                                                    setOpenRes(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        residentId === item.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {item.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </ScrollArea>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button disabled={changeResidentRoom.isPending} onClick={onSubmit} >
                        {changeResidentRoom.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Create Log
                    </Button>
            </DialogContent>
        </Dialog>
    )
}