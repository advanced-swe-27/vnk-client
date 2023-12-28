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
import {  VisitLogRes } from "@/types"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"
import OpenStatusBadge from "../badges/open-status-badge"
import FlagStatusBadge from "../badges/flag-status-badge"

type Props = {
    log: VisitLogRes
}

export default function ViewVisitLogDialog({ log }: Props) {
    const { _id, createdAt, updatedAt, room, checkout, visitor } = log
    const {email, flagged, isStudent, othernames, phone, residence, surname, sid } = visitor
    return (
        <Dialog>
            <ActionTooltip label={`View Key Log`}>
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Key Log Details</DialogTitle>

                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-4">

                    <ViewItem label="room number" value={room.num} />
                    <OpenStatusBadge textCase="uppercase" alt open={checkout === null ? true : false} />
                    <div className="col-span-2">
                        <ViewItem label="Opened At" value={format(new Date(createdAt), "PPpp")} />

                    </div>
                    <div className="col-span-2">
                        <ViewItem label="Closed At" value={checkout ? format(new Date(checkout), "PPpp") : "N/A"} />

                    </div>
                    <div className="col-span-2 border-b">
                        Visitor Details
                   </div>
                    <ViewItem label="othernames" value={othernames} />
                    <ViewItem label="surname" value={surname} />
                    <ViewItem label="email" value={email} />
                    <ViewItem label="Student ID" value={sid || "N/A"} />
                    <ViewItem label="residence" value={residence} />
                    <ViewItem label="phone" value={phone} />
                </div>

            </DialogContent>
        </Dialog>

    )
}