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
import { RoomRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"

type Props = {
    room: RoomRes
}

export default function ViewRoomDialog({ room }: Props) {
    const { _id, createdAt, capacity, gender, num, updatedAt } = room
    return (
        <Dialog>
            <ActionTooltip label={`View Room`}>
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Room Details</DialogTitle>

                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-4">

                    <ViewItem label="room number" value={num} />
                    <ViewItem label="capacity" value={_.toString(capacity)} />
                    <ViewItem label="gender" value={gender} />
                    <div className="col-span-2">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                    <div className="col-span-2">
                        <ViewItem label="Updated At" value={format(new Date(updatedAt), "PPPP")} />

                    </div>
                </div>

            </DialogContent>
        </Dialog>

    )
}