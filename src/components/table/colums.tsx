"use client"
// Define all the columns for all the tables here

import { DataTableColumnHeader } from "./data-table-column-header"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { BsEye } from "react-icons/bs"
import { BiSolidEdit, BiTrashAlt } from "react-icons/bi"
import { DialogTitle } from "../ui/dialog"
import * as React from "react"

const actionsMap = {
    edit: (
        <div className="flex items-center gap-2 ">
            <BiSolidEdit className="text-xl" />
            Edit
        </div>
    ),
    status: (
        <div className="flex items-center gap-2 ">
            <BiSolidEdit className="text-xl" />
            Change Status
        </div>
    ),
    view: (<div className="flex items-center gap-2 ">
        <BsEye className="text-xl" />
        View
    </div>),

    delete: (<div className="flex items-center gap-2 ">
        <BiTrashAlt className="text-xl" />
        Delete
    </div>),
    block: (<div className="flex items-center gap-2 ">
        <BiTrashAlt className="text-xl" />
        Block
    </div>),
    unblock: (<div className="flex items-center gap-2 ">
        <BiTrashAlt className="text-xl" />
        Unblock
    </div>),

}