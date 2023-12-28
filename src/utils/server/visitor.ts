import Axios from "../axios"
import _ from "lodash"
import { ApiResponse, VisitorRes, Visitor } from "@/types"

type CreateVisitorInput = Omit<Visitor, "flagged">

export const CREATE_VISITOR = async (info: CreateVisitorInput, token: string) => {
    try {
        const response: ApiResponse<VisitorRes> = await Axios({
            method: "POST",
            url: `/visitor/`,
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

export const UPDATE_VISITOR = async (id: string, info: Visitor, token: string) => {
    try {
        const response: ApiResponse<VisitorRes> = await Axios({
            method: "PUT",
            url: `/visitor/${id}`,
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

export const GET_ALL_VISITORS = async (token: string) => {
    try {
        const response: ApiResponse<VisitorRes[]> = await Axios({
            method: "GET",
            url: `/visitor/`,
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

export const GET_VISITOR = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitorRes> = await Axios({
            method: "GET",
            url: `/visitor/${id}`,
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

export const FLAG_VISITOR = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitorRes[]> = await Axios({
            method: "PATCH",
            url: `/visitor/flag/${id}`,
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

export const UNFLAG_VISITOR = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitorRes[]> = await Axios({
            method: "PATCH",
            url: `/visitor/unflag/${id}`,
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

export const DELETE_VISITOR = async (id: string, token: string) => {
    try {
        const response: ApiResponse<VisitorRes> = await Axios({
            method: "DELETE",
            url: `/visitor/${id}`,
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
