import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import { ClassValue } from "clsx"

type Props = {
    name: string
    img: string
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

type SizesType = {
    "xs": ClassValue
    "sm": ClassValue
    "md": ClassValue
    "lg": ClassValue
    "xl": ClassValue
    "2xl": ClassValue
}

export default function UserAvatar({ name, img, size }: Props) {
    const sizes: SizesType = {
        "xs": "w-[30px] h-[30px]",
        "sm": "w-[40px] h-[40px]",
        "md": "w-[60px] h-[60px]",
        "lg": "w-[80px] h-[80px]",
        "xl": "w-[100px] h-[100px]",
        "2xl": "w-[120px] h-[120px]",
    }
    return (
        <Avatar className={cn(
            "aspect-square",
            sizes[size || "sm"]
        )}>
            <AvatarImage className="object-cover object-center" src={img} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
    )
}