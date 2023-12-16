"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ActionTooltipProps { 
    label?: string
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    icon?: JSX.Element
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({label, children, side, align, icon}) => {
  return (
    <TooltipProvider>
            <Tooltip delayDuration={50} >
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side || "top"} align={align || "center"}>
                    <p className="capitalize flex items-center font-normal text-sm">
                    {icon} {label?.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
  )
}

export default ActionTooltip