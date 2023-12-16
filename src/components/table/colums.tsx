"use client"
// Define all the columns for all the tables here

import { DataTableColumnHeader } from "./data-table-column-header"
import { Button } from "@/components/ui/button"
import { ResidentRes, UserRes } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import * as React from "react"
import ViewUserDialog from "../dialogs/view-user-dialog"
import DeleteUserDialog from "../dialogs/delete-user-dialog"

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


export const residentColumns: ColumnDef<ResidentRes>[] = [
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
                {/* <ViewUserDialog user={row.original} />
                <DeleteUserDialog user={row.original} /> */}

            </div>
        ),
    }
]