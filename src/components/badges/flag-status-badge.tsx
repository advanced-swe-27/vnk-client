import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import _ from "lodash"
import ActionTooltip from "../core/action-tooltip"


type Props = {
    flag: boolean
    textCase?: "capitalize" | "uppercase"
    sm?: boolean
}

export default function FlagStatusBadge({ flag, textCase, sm }: Props) {

    const variantsMap: ClassValue = flag ? "bg-destructive" : "bg-emerald-500"

    const icon = flag && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
    </svg>



    const label = flag ? "Flagged": "Not Flagged"
    return sm ? (
        <ActionTooltip label="This visitor is flagged">
            <Badge className={cn(
                "w-max  rounded-lg bg-transparent hover:bg-transparent font-light",
                flag ? "" : "text-destructive"
            )}>
                {icon}
            </Badge>
        </ActionTooltip>
    ) : <Badge className={cn(
        "w-max py-1 px-4 rounded-lg h-max my-auto font-light",
        variantsMap
    )}>
        {
             <>
                {
                    textCase === "uppercase" ? _.toUpper(label) : _.capitalize(label)
                }
            </>
        }
    </Badge>
}