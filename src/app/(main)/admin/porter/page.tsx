"use client"
import RoleViewProvider from "@/providers/role-view-provider";
import { porterColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "react-use";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import { GET_USERS } from "@/utils/server/user";
import CustomError from "@/components/core/custom-error";
import CreateUserDialog from "@/components/dialogs/create-user-dialog";

export default function PortersPage() {
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['porters'],
        queryFn: async () => {
            if (user && user.token) {
                const porters = await GET_USERS("PORTER", user.token)
                return porters
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
        <RoleViewProvider role="ADMIN">
            <div className="h-full">
                <CreateUserDialog role="PORTER" />
                <>
                    {
                        (isError || data === undefined) ? <CustomError /> :
                            <DataTable
                                filterableCol="email"
                                columns={porterColumns}
                                data={data} title="porters" />
                    }
                </>
            </div>
        </RoleViewProvider>
    )
}