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
import { UserRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { DELETE_USER } from "@/utils/server/user"

type Props = {
    user: UserRes
}

export default function DeleteUserDialog({ user: selectedUser }: Props) {
    const { role } = selectedUser

    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)

    const deleteUser = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_USER(selectedUser._id, role, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (deleted) => {
            queryClient.setQueryData(['porters'], (oldData: UserRes[]) => {
                return oldData ? oldData.filter((item) => item._id !== selectedUser._id) : oldData
            })
            toast.success("Deleted User successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Couldn't delete homeowner. Try again later")
        }
    })

    function onSubmit() {
        deleteUser.mutate(undefined)
    }

    return (
        <RoleViewProvider role={role === "PORTER" ? "ADMIN" : "SUDO"}>
            <Dialog>
                <ActionTooltip label={`Delete ${_.capitalize(role)}`}>
                    <DialogTrigger>
                        {tableIconsMap.delete}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete this account
                            and remove their data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <Button disabled={deleteUser.isPending} onClick={onSubmit} variant="destructive">
                        {deleteUser.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Delete User
                    </Button>

                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}