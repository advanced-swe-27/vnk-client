"use client"
// Define all the columns for all the tables here

import { DataTableColumnHeader } from "./data-table-column-header"
import { ResidentWithRoomRes, UserRes, RoomRes } from "@/types"
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
import ViewRoomDialog from "../dialogs/view-room-dialog"
import { format } from "date-fns"
import DeleteRoomDialog from "../dialogs/delete-room-dialog"

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

export const roomsColumns: ColumnDef<RoomRes>[] = [
    {
        accessorKey: "num",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Room Number" />
        ),
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gender" />
        ),
    },
    {
        accessorKey: "capacity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Capacity" />
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => (
            <>
                {format(new Date(row.original.createdAt), "PPPP")}
            </>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewRoomDialog room={row.original} />
                <DeleteRoomDialog room={row.original} />
            </div>
        ),
    }
]