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
import { UserRes } from "@/types"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import ViewItem from "../core/view-item"
import { format } from "date-fns"

type Props = {
    user: UserRes
}

export default function ViewUserDialog({ user }: Props) {
    const { role, _id, createdAt, email, othernames, phone, surname } = user
    return (
        <RoleViewProvider role={role === "PORTER" ? "ADMIN" : "SUDO"}>
            <Dialog>
                <ActionTooltip label={`View ${_.capitalize(role)}`}>
                    <DialogTrigger>
                        {tableIconsMap.view}
                    </DialogTrigger>
                </ActionTooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>View {_.capitalize(role)} Details</DialogTitle>
                        
                    </DialogHeader>
                    <div className="w-full grid grid-cols-2 gap-4">
                        <ViewItem label="othernames" value={othernames} />
                        <ViewItem label="surname" value={surname} />
                        <ViewItem label="email" value={email} />
                        <ViewItem label="phone" value={phone} />
                        <ViewItem label="role" value={role} />
                        <div className="col-span-2">
                        <ViewItem label="Created At" value={format(new Date(createdAt),  "PPPP")} />

                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}