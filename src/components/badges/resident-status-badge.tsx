import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ResidentStatus } from "@/types"
import _ from "lodash"

type Props = {
    status: ResidentStatus
    textCase?: "capitalize" | "uppercase"
    sm?: boolean
}

export default function ResidentStatusBadge({ status, textCase, sm}: Props) {
    
    const variantsMap = {
        approved: "bg-emerald-500",
        rejected: "bg-destructive",
        pending: "bg-neutral-500",
    }
    return (
        <Badge className={cn("w-max py-1 px-4 rounded-lg font-light", sm && "w-2 p-0 h-2   ", variantsMap[status])}>
            {
                !sm && <>
            {
                textCase === "uppercase" ? _.toUpper(status) : _.capitalize(status)
            }
                </>
            }
        </Badge>
    )
}