"use client"
import RoleViewProvider from "@/providers/role-view-provider";
import { porterColumns, roomsColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "react-use";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import { GET_ROOMS } from "@/utils/server/room";
import CustomError from "@/components/core/custom-error";
import CreateUserDialog from "@/components/dialogs/create-user-dialog";
import CreateRoomDialog from "@/components/dialogs/create-room-dialog";

export default function PortersPage() {
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            if (user && user.token) {
                const rooms = await GET_ROOMS()
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
                <CreateRoomDialog />
                <>
                    {
                        (isError || data === undefined) ? <CustomError /> :
                            <DataTable
                                filterableCol="num"
                                columns={roomsColumns}
                                data={data} title="rooms" />
                    }
                </>
            </div>
    )
}