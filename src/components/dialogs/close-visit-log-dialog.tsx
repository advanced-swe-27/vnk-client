"use client"
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
import {  VisitLogRes, UserRes } from "@/types"
import _ from "lodash"
import { Button } from "../ui/button"
import {  Loader2, } from "lucide-react"
import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { CLOSE_VISIT_LOG } from "@/utils/server/visit-log"

type Props = {
    log: VisitLogRes
}

export default function CloseVisitLogDialog({ log }: Props) {
    const { _id, createdAt, updatedAt, room, } = log


    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)


    const approveResident = useMutation({
        mutationFn: () => {
            if (user && user.token) {
               
                return CLOSE_VISIT_LOG(_id,  user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['visit-logs'], (oldData: VisitLogRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            toast.success("Deleted log successfully")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Couldn't delete log. Try again later")
        }
    })

    function onSubmit() {
        approveResident.mutate(undefined)
    }
    return (
        <Dialog>
            <ActionTooltip label={`Close Visit Log`}>
                <DialogTrigger>
                    {tableIconsMap.close}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Close This Visit Log?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to close this key log. Closing this log will permanently end this key session. You would have to create a new one
                    </DialogDescription>
                </DialogHeader>
             
            

                <Button disabled={approveResident.isPending} onClick={onSubmit}  >
                    {approveResident.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Close Log
                </Button>

            </DialogContent>
        </Dialog>

    )
}