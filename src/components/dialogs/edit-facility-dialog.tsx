import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { tableIconsMap } from "../table/table-icons-map"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { FacilityRes } from "@/types"
import EditFacilityForm from "../forms/edit-facility-form"

type Props = {
    facility: FacilityRes
}

export default function EditFacilityDialog({ facility }: Props) {

    return (
        <RoleViewProvider role={"SUDO"}>
            <Dialog>
                <DialogTrigger>
                    {tableIconsMap.edit}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit This Facility?  </DialogTitle>
                    </DialogHeader>
                    <EditFacilityForm facility={facility} />
                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}