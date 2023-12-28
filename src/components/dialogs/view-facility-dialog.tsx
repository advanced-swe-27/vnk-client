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
import { FacilityRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"

type Props = {
    facility: FacilityRes
}

export default function ViewFacilityDialog({ facility }: Props) {
    const { _id, createdAt, name, description, updatedAt } = facility
    return (
        // <RoleViewProvider role="SUDO" >
            <Dialog>
                <ActionTooltip label={`View Facility`}>
                    <DialogTrigger>
                        {tableIconsMap.view}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>View Facility Details</DialogTitle>

                    </DialogHeader>
                    <div className="w-full grid grid-cols-2 gap-4">
                        <ViewItem label="name" value={name} />
                        <div className="col-span-2">
                            <ViewItem label="description" value={description} />
                        </div>
                        <div className="col-span-2">
                            <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        // </RoleViewProvider>
    )
}