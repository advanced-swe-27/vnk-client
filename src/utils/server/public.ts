import { ApiResponse} from "@/types"
import Axios from "../axios"

export type AllCounts = {
    keyLogs: number
    facilities: number
    residents: number
    rooms: number
    visitLogs: number
    visitors: number
    porters: number
    openVisitLogs: number
    openKeyLogs: number
}

export const GET_ALL_COUNTS = async () => {
    try {
        const response: ApiResponse<AllCounts> = await Axios({
            method: "GET",
            url: `/public/`,
        })

        if (response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}