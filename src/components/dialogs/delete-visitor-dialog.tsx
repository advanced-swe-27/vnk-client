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
import { VisitorRes, UserRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { DELETE_VISITOR } from "@/utils/server/visitor"

type Props = {
    visitor: VisitorRes
}

export default function DeleteVisitorDialog({ visitor }: Props) {
    const { _id, othernames,  surname, email} = visitor

    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)

    const approveVisitor = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_VISITOR(_id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['visitors'], (oldData: UserRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            toast.success("Deleted visitor successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Couldn't delete visitor. Try again later")
        }
    })

    function onSubmit() {
        approveVisitor.mutate(undefined)
    }
    return (
        // <RoleViewProvider role="SUDO">
            <Dialog>
                <ActionTooltip label={`Delete Visitor`}>
                    <DialogTrigger>
                        {tableIconsMap.delete}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete This Visitor?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to approve <span className="font-medium text-neutral-500"> {othernames} {surname} ({email})</span> This action can not be undone and all data pertaining to this visitor will be permanently removed from our servers
                        </DialogDescription>
                    </DialogHeader>
                    <Button disabled={approveVisitor.isPending} onClick={onSubmit} variant="destructive" >
                        {approveVisitor.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Delete Visitor
                    </Button>

                </DialogContent>
            </Dialog>
        // </RoleViewProvider>

    )
}