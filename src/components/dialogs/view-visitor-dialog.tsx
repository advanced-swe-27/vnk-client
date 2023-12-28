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
import { ResidentWithRoomRes, VisitorRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"
import UserAvatar from "../core/user-avatar"
import ResidentStatusBadge from "../badges/resident-status-badge"
import FlagStatusBadge from "../badges/flag-status-badge"

type Props = {
    visitor: VisitorRes
}

export default function ViewVisitorDialog({ visitor }: Props) {
    const { _id, createdAt, email, othernames, phone, sid, surname, updatedAt, flagged, isStudent, residence } = visitor
    return (
        <Dialog>
            <ActionTooltip label={`View Visitor`}>
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Visitor Details</DialogTitle>

                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="col-span-2 flex items-center justify-end">
                        <FlagStatusBadge textCase="uppercase" flag={flagged} />
                    </div>
                    <ViewItem label="othernames" value={othernames} />
                    <ViewItem label="surname" value={surname} />
                    <ViewItem label="email" value={email} />
                    <ViewItem label="Student ID" value={sid || "N/A"} />
                    <ViewItem label="room" value={residence} />
                    <ViewItem label="phone" value={phone} />


                    <div className="col-span-2">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />

                    </div>
                </div>

            </DialogContent>
        </Dialog>

    )
}