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
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { DELETE_VISIT_LOG } from "@/utils/server/visit-log"
type Props = {
    log: VisitLogRes
}

export default function DeleteVisitLogDialog({ log }: Props) {
    const { _id, createdAt, updatedAt,checkout, room, visitor } = log


    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)

    const approveResident = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_VISIT_LOG(_id, user.token)
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
            toast.error(error?.response?.data?.message || "Couldn't delete  log. Try again later")
        }
    })

    function onSubmit() {
        approveResident.mutate(undefined)
    }
    return (
            <Dialog>
                <ActionTooltip label={`Delete Key Log`}>
                    <DialogTrigger>
                        {tableIconsMap.delete}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete This Visit Log?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this visit log. This action can not be undone and all data pertaining to this log will be permanently removed from our servers
                        </DialogDescription>
                    </DialogHeader>
                    <Button disabled={approveResident.isPending} onClick={onSubmit} variant="destructive" >
                        {approveResident.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Delete Log
                    </Button>

                </DialogContent>
            </Dialog>

    )
}