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
import { ResidentWithRoomRes, RoomRes, UserRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast"
import { DELETE_ROOM } from "@/utils/server/room"

type Props = {
    room: RoomRes
}

export default function DeleteRoomDialog({ room }: Props) {
    const { _id, createdAt, capacity, gender, num, updatedAt } = room


    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)

    const approveResident = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_ROOM(_id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['rooms'], (oldData: RoomRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            toast.success("Deleted room successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Couldn't delete room. Try again later")
        }
    })

    function onSubmit() {
        approveResident.mutate(undefined)
    }
    return (
        <RoleViewProvider role="SUDO">
            <Dialog>
                <ActionTooltip label={`Delete Resident`}>
                    <DialogTrigger>
                        {tableIconsMap.delete}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete This Room?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete room <span className="font-medium text-neutral-500"> {num}</span> This action can not be undone and all data pertaining to this room will be permanently removed from our servers
                        </DialogDescription>
                    </DialogHeader>
                    <Button disabled={approveResident.isPending} onClick={onSubmit} variant="destructive" >
                        {approveResident.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Delete Room
                    </Button>

                </DialogContent>
            </Dialog>
        </RoleViewProvider>

    )
}