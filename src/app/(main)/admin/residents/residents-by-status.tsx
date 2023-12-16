"use client"
import { residentColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {  ResidentRes, } from '@/types';
import { useSearchParams,  usePathname } from 'next/navigation'
import Link from "next/link";

export default function ResidentsByStatus({data}: {data: ResidentRes[]}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const status = searchParams.get('status')

    const newRes = data?.filter((item) => item.status === status)

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
                            filterableCol="sid"
                            columns={residentColumns}
                            data={newRes} title="residents" />
                }
            </>
        </div>
    )
}