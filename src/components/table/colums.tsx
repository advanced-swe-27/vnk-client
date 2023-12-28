"use client"
// Define all the columns for all the tables here

import { DataTableColumnHeader } from "./data-table-column-header"
import { ResidentWithRoomRes, UserRes, RoomRes, KeyLogRes, VisitorRes } from "@/types"
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
import OpenStatusBadge from "../badges/open-status-badge"
import ViewKeyLogDialog from "../dialogs/view-key-log-dialog"
import DeleteKeyLogDialog from "../dialogs/delete-key-log-dialog"
import CloseKeyLogDialog from "../dialogs/close-key-log-dialog"
import FlagStatusBadge from "../badges/flag-status-badge"

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

export const keyLogColumns: ColumnDef<KeyLogRes>[] = [
    {
        accessorKey: "room",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Room" />
        ),
        cell: ({ row }) => (
            <>
               {row.original.room.num} 
            </>
        ),
    },
    {
        accessorKey: "openedBy",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Opened By" />
        ),
        cell: ({ row }) => (
            <>
               {row.original.openedBy.othernames} {row.original.openedBy.surname}
            </>
        ),
    },
    {
        accessorKey: "closedBy",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Closed By" />
        ),
        cell: ({ row }) => (
            <>
                {
                    row.original.closedBy ? <>
                     {row.original.closedBy?.othernames} {row.original.closedBy?.surname}
                    </> : <>
                    N/A
                        </>
                }
              
            </>
        ),
    },
    {
        id: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
           <OpenStatusBadge textCase="uppercase" open={row.original.closedAt === undefined || row.original.closedAt === null ? true : false} />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewKeyLogDialog log={row.original} />
                <CloseKeyLogDialog log={row.original} />
                <DeleteKeyLogDialog log={row.original} />
            </div>
        ),
    }
]

export const visitorColumns: ColumnDef<VisitorRes>[] = [
    {
        accessorKey: "othernames",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.othernames} {row.original.surname} <FlagStatusBadge  flag={row.original.flagged} />
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
                {/* <ViewResidentDialog resident={row.original} />
                {
                    row.original.status !== "approved" && <ApproveResidentDialog resident={row.original} />
                }
                {
                    row.original.status !== "rejected" && <RejectResidentDialog resident={row.original} />
                }
              
                <ChangeResidentRoomDialog resident={row.original} />
                <DeleteResidentDialog resident={row.original} /> */}
            </div>
        ),
    }
]