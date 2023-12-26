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
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Button } from "../ui/button"
import CreateRoomForm from "../forms/create-room-form"

export default function CreateRoomDialog() {
    return (
        <RoleViewProvider role={"SUDO"}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="ml-auto">
                        New Room
                    </Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Room  </DialogTitle>
                    </DialogHeader>
                    <CreateRoomForm />
                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}