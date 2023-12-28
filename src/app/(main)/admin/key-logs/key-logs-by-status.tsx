"use client"
import { keyLogColumns, residentColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {  KeyLogRes, ResidentRes, ResidentWithRoomRes, } from '@/types';
import { useSearchParams,  usePathname } from 'next/navigation'
import Link from "next/link";
import _ from "lodash";

export default function KeyLogsByStatus({data}: {data: KeyLogRes[]}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const status = searchParams.get('status')

    const filteredData = data?.filter((item) => {
        if (status === 'open') {
            return _.isNil(item.closedBy) || _.isNil(item.closedAt);
        } else if (status === 'closed') {
            return !_.isNil(item.closedBy) && !_.isNil(item.closedAt);
        }
        return true;
    });

    return (
        <div className="h-full">
            <Link href={pathname}>
                <Button >
                    Clear Filter
                </Button>
            </Link>
            <>
                {
                        <DataTable
                            filterableCol="room"
                            columns={keyLogColumns}
                            data={filteredData} title="residents" />
                }
            </>
        </div>
    )
}