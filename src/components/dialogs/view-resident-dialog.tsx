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
import { ResidentWithRoomRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"
import UserAvatar from "../core/user-avatar"
import ResidentStatusBadge from "../badges/resident-status-badge"

type Props = {
    resident: ResidentWithRoomRes
}

export default function ViewResidentDialog({ resident }: Props) {
    const { _id, createdAt, dob, email, gender, imageUrl, level, othernames, phone, programme, room, sid, status, surname, updatedAt } = resident
    return (
        <Dialog>
            <ActionTooltip label={`View Resident`}>
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Resident Details</DialogTitle>

                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="row-span-3 w-full flex items-center justify-center">
                        <UserAvatar
                            name={`${othernames} ${surname}`}
                            img={imageUrl}
                            size="2xl"
                        />
                    </div>
                    <ResidentStatusBadge status={status} />
                    <ViewItem label="othernames" value={othernames} />
                    <ViewItem label="surname" value={surname} />
                    <ViewItem label="email" value={email} />
                    <ViewItem label="Student ID" value={sid} />
                    <ViewItem label="room" value={room?.num} />
                    <ViewItem label="phone" value={phone} />
                    <ViewItem label="gender" value={gender} />
                    <ViewItem label="level" value={level} />
                    {/* <ViewItem label="role" value={role} /> */}
                    <div className="col-span-2">
                        <ViewItem label="programme" value={programme} />

                    </div>
                    <div className="col-span-2">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />

                    </div>
                </div>

            </DialogContent>
        </Dialog>

    )
}