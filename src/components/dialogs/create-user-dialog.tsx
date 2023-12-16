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
import { UserRes, UserRoles } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import CreateUserForm from "../forms/create-user-form"
import { Button } from "../ui/button"

export default function CreateUserDialog({role}: {role: UserRoles}) {
    return (
        <RoleViewProvider role={role === "PORTER" ? "ADMIN" : "SUDO"}>
            <Dialog>
                    <DialogTrigger asChild>
                        <Button className="ml-auto">
                            New {_.capitalize(role)}
                        </Button>
                       
                    </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New {_.capitalize(role)} Account </DialogTitle>
                    </DialogHeader>
                    <CreateUserForm role={role} />
                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}