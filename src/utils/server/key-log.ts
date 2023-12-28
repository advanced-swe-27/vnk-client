import Axios from "../axios"
import _ from "lodash"
import { ApiResponse, KeyLogRes, OpenKeyLogInput, CloseKeyLogInput } from "@/types"

export const CREATE_KEY_LOG = async (info: OpenKeyLogInput, token: string) => {
    try {
        const response: ApiResponse<KeyLogRes> = await Axios({
            method: "POST",
            url: `/key-log/`,
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

export const CLOSE_KEY_LOG = async (id: string, info: CloseKeyLogInput, token: string) => {
    try {
        const response: ApiResponse<KeyLogRes> = await Axios({
            method: "PATCH",
            url: `/key-log/${id}`,
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

export const GET_ALL_KEY_LOGS = async (token: string) => {
    try {
        const response: ApiResponse<KeyLogRes[]> = await Axios({
            method: "GET",
            url: `/key-log/`,
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

export const GET_KEY_LOG = async (id: string, token: string) => {
    try {
        const response: ApiResponse<KeyLogRes> = await Axios({
            method: "GET",
            url: `/key-log/${id}`,
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

export const GET_KEY_LOG_BY_ROOM = async (id: string, token: string) => {
    try {
        const response: ApiResponse<KeyLogRes[]> = await Axios({
            method: "GET",
            url: `/key-log/room/${id}`,
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

export const DELETE_KEY_LOG = async (id: string, token: string) => {
    try {
        const response: ApiResponse<KeyLogRes> = await Axios({
            method: "DELETE",
            url: `/key-log/${id}`,
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
