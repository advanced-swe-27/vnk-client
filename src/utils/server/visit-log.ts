import Axios from "../axios"
import { ApiResponse, VisitLog, VisitLogRes } from "@/types"

export type OpenVisitLogInput = {
    room: string
    visitor: string
}

export const CREATE_VISIT_LOG = async (info: OpenVisitLogInput, token: string) => {
    try {
        const response: ApiResponse<VisitLogRes> = await Axios({
            method: "POST",
            url: `/visit-log/`,
            data: info,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const CLOSE_VISIT_LOG = async (id: string,  token: string) => {
    try {
        const response: ApiResponse<VisitLogRes> = await Axios({
            method: "PATCH",
            url: `/visit-log/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const GET_ALL_VISIT_LOGS = async (token: string) => {
    try {
        const response: ApiResponse<VisitLogRes[]> = await Axios({
            method: "GET",
            url: `/visit-log/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const GET_VISIT_LOG = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitLogRes> = await Axios({
            method: "GET",
            url: `/visit-log/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const GET_VISIT_LOG_BY_ROOM = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitLogRes[]> = await Axios({
            method: "GET",
            url: `/visit-log/room/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const DELETE_VISIT_LOG = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitLogRes> = await Axios({
            method: "DELETE",
            url: `/visit-log/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}
