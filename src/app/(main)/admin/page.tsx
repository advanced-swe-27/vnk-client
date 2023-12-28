"use client"
import { useQuery } from "@tanstack/react-query"

import CustomError from "@/components/core/custom-error";
import CustomLoader from "@/components/loaders/custom-loader";
import { GET_ALL_COUNTS } from "@/utils/server/public";
import DashboardCard from "@/components/cards/dashboard-card";
import { dashBoardIconsMap } from "@/utils/client";
import CreateVisitorDialog from "@/components/dialogs/create-visitor-dialog";
import CreateKeyLogDialog from "@/components/dialogs/create-key-log-dialog";
import CreateVisitLogDialog from "@/components/dialogs/create-visit-log-dialog";

export default function DashboardPage() {
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['all-counts'],
        queryFn: async () => {
            const rooms = await GET_ALL_COUNTS()
            return rooms

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
    if (isError || data === undefined) {
        return (
            <section className="flex items-center justify-center w-full h-full">
                <CustomError />
            </section>

        )
    }

    return (
        <div className="h-full">
            <div className="w-full grid grid-cols-3 2xl:grid-cols-4 gap-6">
                <DashboardCard count={data.facilities} label="Facilities" icon={dashBoardIconsMap.facilities} />
                <DashboardCard count={data.keyLogs} label="Key Logs" icon={dashBoardIconsMap.keyLogs} />
                <DashboardCard count={data.openKeyLogs} label="Open Key Logs" icon={dashBoardIconsMap.openKeyLogs} />
                <DashboardCard count={data.openVisitLogs} label="Open Visit Logs" icon={dashBoardIconsMap.openVisitLogs} />
                <DashboardCard count={data.porters} label="Porters" icon={dashBoardIconsMap.porters} />
                <DashboardCard count={data.residents} label="Residents" icon={dashBoardIconsMap.residents} />
                <DashboardCard count={data.rooms} label="Rooms" icon={dashBoardIconsMap.rooms} />
                <DashboardCard count={data.visitLogs} label="Visit Logs" icon={dashBoardIconsMap.visitLogs} />
                <DashboardCard count={data.visitors} label="Visitors" icon={dashBoardIconsMap.visitors} />
                <CreateVisitorDialog />
                <CreateKeyLogDialog />
                <CreateVisitLogDialog />
            </div>
        </div>
    )
}