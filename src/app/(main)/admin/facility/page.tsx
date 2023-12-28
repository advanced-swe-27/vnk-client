"use client"
import RoleViewProvider from "@/providers/role-view-provider";
import { facilityColumns } from "@/components/table/colums";
import { DataTable } from "@/components/table/data-table";
import { useLocalStorage } from "react-use";
import { UserRes } from '@/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/components/loaders/custom-loader";
import CustomError from "@/components/core/custom-error";
import { GET_FACILITIES } from "@/utils/server/facility";
import CreateFacilityDialog from "@/components/dialogs/create-facility-dialog";

export default function PortersPage() {
    const [user, setUser] = useLocalStorage<UserRes | null>("user", null)
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['facilities'],
        queryFn: async () => {
            if (user && user.token) {
                const facilities = await GET_FACILITIES(user.token)
                return facilities
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
        <RoleViewProvider role="SUDO">
            <div className="h-full">
                <CreateFacilityDialog />
                <>
                    {
                        (isError || data === undefined) ? <CustomError /> :
                            <DataTable
                                filterableCol="name"
                                columns={facilityColumns}
                                data={data} title="facilities" />
                    }
                </>
            </div>
        </RoleViewProvider>
    )
}