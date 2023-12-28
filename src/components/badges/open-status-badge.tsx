import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import _ from "lodash"


type Props = {
    open: boolean
    textCase?: "capitalize" | "uppercase"
    sm?: boolean
    alt?: boolean
}

export default function OpenStatusBadge({ open, textCase, sm, alt}: Props) {
    
    const variantsMap: ClassValue = open ? "bg-emerald-500" : "bg-purple-500"

    function genText(): string {
        if (open && !alt) {
            return "Open"
        } else if (!open && !alt) {
            return "Closed"
        } else if (open && alt) {
            return "Active"
        } else {
            return "Inactive"
        }
    }
    

    return (
        <Badge className={cn(
            "w-max py-1 px-4 rounded-lg font-light",
            sm && "w-2 p-0 h-2",
            variantsMap
        )}>
            {
                !sm && <>
            {
                textCase === "uppercase" ? _.toUpper(genText()) : _.capitalize(genText())
            }
                </>
            }
        </Badge>
    )
}