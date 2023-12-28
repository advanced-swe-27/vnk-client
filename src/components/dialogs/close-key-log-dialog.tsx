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
import { CloseKeyLogInput, KeyLogRes, UserRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Button } from "../ui/button"
import { Check, Loader2, ChevronsUpDown } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { CLOSE_KEY_LOG } from "@/utils/server/key-log"
import ViewItem from "../core/view-item"
import { useEffect, useState } from "react"
import { GET_RESIDENTS, GET_RESIDENTS_BY_ROOM } from "@/utils/server/resident"
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

type Props = {
    log: KeyLogRes
}

export default function CloseKeyLogDialog({ log }: Props) {
    const { _id, createdAt, updatedAt, openedBy, room, closedAt, closedBy } = log


    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const [trimmedRes, setTrimmedRes] = useState<{ value: string; label: string }[]>([])
    const [openRes, setOpenRes] = useState(false)
    const [residentId, setResidentId] = useState("")

    const allResidentsQuery = useQuery({
        queryKey: [_.toString(_id)],
        queryFn: async () => {
            if (user && user.token) {
                const residents = await GET_RESIDENTS_BY_ROOM(room._id, user.token)
                return residents
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })

    useEffect(() => {
        if (allResidentsQuery.data !== undefined || !allResidentsQuery.isError) {
            const newRes = allResidentsQuery.data?.map(resident => ({
                value: resident._id,
                label: `${resident.othernames} ${resident.surname} - ${resident.sid}`
            }))
            setTrimmedRes(newRes || [])
        }

    }, [allResidentsQuery.data, allResidentsQuery.isError]);


    const approveResident = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                const info: CloseKeyLogInput = {
                    closedBy: residentId
                }
                return CLOSE_KEY_LOG(_id, info, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['key-logs'], (oldData: KeyLogRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            toast.success("Deleted log successfully")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Couldn't delete key log. Try again later")
        }
    })

    function onSubmit() {
        approveResident.mutate(undefined)
    }
    return (
        <Dialog>
            <ActionTooltip label={`Close Key Log`}>
                <DialogTrigger>
                    {tableIconsMap.close}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Close This Key Log?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to close this key log. Closing this log will permanently end this key session. You would have to create a new one
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-4">

                    <ViewItem label="room number" value={room.num} />
                    <div className="col-span-2">
                        <ViewItem label="opened by" value={`${openedBy?.othernames} ${openedBy?.surname}`} />
                    </div>


                </div>
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

                <Button disabled={approveResident.isPending} onClick={onSubmit}  >
                    {approveResident.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Close Log
                </Button>

            </DialogContent>
        </Dialog>

    )
}