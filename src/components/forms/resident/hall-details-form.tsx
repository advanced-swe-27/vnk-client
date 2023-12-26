"use client"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/context/resident-form-context"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Check, Loader2, ChevronsUpDown } from "lucide-react"
import { GET_ROOMS } from "@/utils/server/room"
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CREATE_RESIDENT } from "@/utils/server/resident"
import { ResidentWithRoomRes } from "@/types"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function HallDetailsForm() {
    const { onHandleNext, setFormData, formData, onHandleBack, step } = useFormState();
    const queryClient = useQueryClient()
    const [trimmedRooms, setTrimmedRooms] = useState<{ value: string; label: string }[]>([])
    const [open, setOpen] = useState(false)
    const [roomId, setRoomId] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const allRoomsQuery = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const rooms = await GET_ROOMS()
            return rooms
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
            return CREATE_RESIDENT({
                ...formData,
                room: roomId
            })
        },

        onSuccess: (newData) => {
            // queryClient.setQueryData(['residents'], (oldData: ResidentWithRoomRes[]) => {
            //     return [...oldData, newData]
            // })
            toast.success("Created resident successfully")
            setSubmitted(true)
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Couldn't create resident. Try again later")
        }
    })


    function onSubmit() {
        setFormData((prev: any) => ({ ...prev, room: roomId }));
        changeResidentRoom.mutate(undefined)
    }

    return submitted ? (
        <div className="min-h-[60vh] flex flex-col gap-8 items-center  justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[100px] h-[100px] mx-auto stroke-emerald-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>

            <p className="text-center text-neutral-600">
                You have successfully registered as a resident. The hall tutor will approve your details and you will officially be registered.
            </p>

            <div className="mx-auto w-max flex items-center gap-4">

                <Button onClick={() => {
                    if (typeof window !== undefined) {
                        location.reload()
                    }
                }} type="button" className="px-8 gap-4">
                    Register Again

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>





                </Button>
            </div>

        </div>
    ) : (
        <form className="  w-full space-y-5  ">
            <h4 className="text-xl">
                Choose your room
            </h4>

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

            <div className="ml-auto w-max flex items-center gap-4">
                {
                    step !== 1 &&
                    <Button onClick={onHandleBack} variant="secondary" type="button" className="px-8 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        Previous
                    </Button>
                }
                <Button disabled={!roomId || changeResidentRoom.isPending} onClick={onSubmit} type="button" className="px-8 gap-4">
                    Submit

                    {changeResidentRoom.isPending ? <Loader2 className="animate-spin h-4 w-4 mr-4" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>}




                </Button>
            </div>
        </form>
    )
}