"use client"
import CreateVisitorDialog from "@/components/dialogs/create-visitor-dialog";
import {  roomsColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import CustomError from "@/components/core/custom-error";
import { GET_ALL_VISITORS } from "@/utils/server/visitor";

export default function VisitorsPage() {
    return (
        <div className="h-full">
            <CreateVisitorDialog />
            
        </div>
    )
}