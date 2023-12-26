"use client"
// Define all the columns for all the tables here

import { DataTableColumnHeader } from "./data-table-column-header"
import { Button } from "@/components/ui/button"
import { ResidentWithRoomRes, UserRes } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import * as React from "react"
import ViewUserDialog from "../dialogs/view-user-dialog"
import DeleteUserDialog from "../dialogs/delete-user-dialog"
import ViewResidentDialog from "../dialogs/view-resident-dialog"
import ApproveResidentDialog from "../dialogs/approve-resident-dialog"
import RejectResidentDialog from "../dialogs/reject-resident-dialog"
import ChangeResidentRoomDialog from "../dialogs/change-resident-room-dialog"
import ResidentStatusBadge from "../badges/resident-status-badge"
import DeleteResidentDialog from "../dialogs/delete-resident-dialog"

export const porterColumns: ColumnDef<UserRes>[] = [
    {
        accessorKey: "othernames",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.othernames} {row.original.surname}
            </>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewUserDialog user={row.original} />
                <DeleteUserDialog user={row.original} />

            </div>
        ),
    }
]


export const residentColumns: ColumnDef<ResidentWithRoomRes>[] = [
    {
        accessorKey: "othernames",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.othernames} {row.original.surname} <ResidentStatusBadge sm status={row.original.status} />
            </>
        ),
    },
    {
        accessorKey: "sid",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Student ID" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewResidentDialog resident={row.original} />
                {
                    row.original.status !== "approved" && <ApproveResidentDialog resident={row.original} />
                }
                {
                    row.original.status !== "rejected" && <RejectResidentDialog resident={row.original} />
                }
              
                <ChangeResidentRoomDialog resident={row.original} />
                <DeleteResidentDialog resident={row.original} />
            </div>
        ),
    }
]