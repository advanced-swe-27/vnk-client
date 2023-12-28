"use client"
import { TabsContent } from "../ui/tabs";
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
import { UserRes, KeyLogRes, OpenKeyLogInput, VisitLogRes } from "@/types"
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
import { GET_ALL_VISITORS } from "@/utils/server/visitor";
import { CREATE_VISIT_LOG, OpenVisitLogInput } from "@/utils/server/visit-log";


export default function CreateVisitLogDialog() {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const [trimmedRooms, setTrimmedRooms] = useState<{ value: string; label: string }[]>([])
    const [trimmedVisitors, setTrimmedVisitors] = useState<{ value: string; label: string }[]>([])
    const [open, setOpen] = useState(false)
    const [openVisitors, setOpenVisitors] = useState(false)

    const [roomId, setRoomId] = useState("")
    const [visitorId, setVisitorId] = useState("")

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


    const allVisitorsQuery = useQuery({
        queryKey: ['visitors'],
        queryFn: async () => {
            if (user && user.token) {
                const visitors = await GET_ALL_VISITORS(user.token)
                return visitors
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
        if (allVisitorsQuery.data !== undefined || !allVisitorsQuery.isError) {
            const newRes = allVisitorsQuery.data?.map(visitor => ({
                value: visitor._id,
                label: `${visitor.othernames} ${visitor.surname}`
            }))
            setTrimmedVisitors(newRes || [])
        }

    }, [allVisitorsQuery.data, allVisitorsQuery.isError]);

    const changeResidentRoom = useMutation({
        mutationFn: () => {
            const info: OpenVisitLogInput = {
                room: roomId,
                visitor: visitorId,
            }
            if (user && user.token) {
                return CREATE_VISIT_LOG(info, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['visit-logs'], (oldData: VisitLogRes[]) => {
                return [...oldData, newData]
            })
            toast.success("Created visit log successfully")
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
                    New Visit Log
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Visit Log  </DialogTitle>
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
                   
                    <Popover open={openVisitors} onOpenChange={setOpenVisitors}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openVisitors}
                                className="w-full justify-between"
                            >
                                {visitorId
                                    ? trimmedVisitors?.find((item) => item.value === visitorId)?.label
                                    : "Select a visitor..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command className="w-full">
                                <CommandInput placeholder="Search visitors by name ..." />
                                <CommandEmpty>No visitor found.</CommandEmpty>
                                <ScrollArea className="h-[200px] w-full">

                                    <CommandGroup>
                                        {trimmedVisitors?.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={(currentValue) => {
                                                    setVisitorId(currentValue === visitorId ? "" : currentValue)
                                                    setOpenVisitors(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        visitorId === item.value ? "opacity-100" : "opacity-0"
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