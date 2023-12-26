"use client"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { tableIconsMap } from "../table/table-icons-map"
import ActionTooltip from "../core/action-tooltip"
import { ResidentRes, ResidentWithRoomRes, UserRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Check, Loader2, ChevronsUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { CHANGE_RESIDENT_ROOM } from "@/utils/server/resident"
import { useEffect, useState } from "react"
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
import ViewItem from "../core/view-item"

type Props = {
    resident: ResidentWithRoomRes
}

export default function ChangeResidentRoomDialog({ resident }: Props) {
    const { _id, othernames, sid, surname, room } = resident

    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const [trimmedRooms, setTrimmedRooms] = useState<{ value: string; label: string }[]>([])
    const [open, setOpen] = useState(false)

    const [roomId, setRoomId] = useState("")

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

    const changeResidentRoom = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return CHANGE_RESIDENT_ROOM(roomId, _id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['residents'], (oldData: ResidentWithRoomRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            toast.success("Changed room successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Couldn't change room. Try again later")
        }
    })

    function onSubmit() {
        changeResidentRoom.mutate(undefined)
    }
    return (
        <RoleViewProvider role="SUDO">
            <Dialog>
                <ActionTooltip label={`Change Room`}>
                    <DialogTrigger>
                        {tableIconsMap.changeRoom}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Resident Room</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to change the room of <span className="font-medium text-neutral-500"> {othernames} {surname} ({sid})</span>
                        </DialogDescription>
                    </DialogHeader>
                   <ViewItem label="Current room" value={room?.num} />
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
                    <Button disabled={changeResidentRoom.isPending} onClick={onSubmit} >
                        {changeResidentRoom.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Change Room
                    </Button>

                </DialogContent>
            </Dialog>
        </RoleViewProvider>

    )
}