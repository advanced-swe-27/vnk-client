"use client"
import CreateVisitorDialog from "@/components/dialogs/create-visitor-dialog";
import {  roomsColumns, visitorColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import CustomError from "@/components/core/custom-error";
import { GET_ALL_VISITORS } from "@/utils/server/visitor";
import { useLocalStorage } from "react-use";

export default function VisitorsPage() {

    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['visitors'],
        queryFn: async () => {
            if (user && user.token) {
                const rooms = await GET_ALL_VISITORS(user.token)
                return rooms
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })

    if (isPending) {
        return (
            <section className="flex items-center justify-center w-full h-full">
                <CustomLoader />
            </section>

        )
    }
    return (
        <div className="h-full">
            <CreateVisitorDialog />
            <>
                    {
                        (isError || data === undefined) ? <CustomError /> :
                            <DataTable
                                filterableCol="email"
                                columns={visitorColumns}
                                data={data} title="visitors" />
                    }
                </>
        </div>
    )
}