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
import CreateFacilityForm from "../forms/create-facility-form"

export default function CreateFacilityDialog() {
    return (
        <RoleViewProvider role={"SUDO"}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="ml-auto">
                        New Facility
                    </Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Facility  </DialogTitle>
                    </DialogHeader>
                    <CreateFacilityForm />
                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}