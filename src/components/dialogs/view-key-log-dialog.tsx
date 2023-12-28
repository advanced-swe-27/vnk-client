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
import { KeyLogRes } from "@/types"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"
import OpenStatusBadge from "../badges/open-status-badge"

type Props = {
    log: KeyLogRes
}

export default function ViewKeyLogDialog({ log }: Props) {
    const { _id, createdAt, updatedAt, openedBy, room, closedAt, closedBy } = log
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
                    <OpenStatusBadge open={!!closedAt} />
                    <div className="col-span-2">
                        <ViewItem label="opened by" value={`${openedBy?.othernames} ${openedBy?.surname}`} />
                    </div>
                    <div className="col-span-2">
                        <ViewItem label="closed by" value={closedBy ? `${closedBy?.othernames} ${closedBy?.surname}` : "N/A"} />
                    </div>
                    <div className="col-span-2">
                        <ViewItem label="Opened At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                    <div className="col-span-2">
                        <ViewItem label="Closed At" value={closedAt ? format(new Date(closedAt), "PPPP") : "Not Closed"} />

                    </div>
                </div>

            </DialogContent>
        </Dialog>

    )
}