import { ApiResponse, Resident, ResidentRes, ResidentWithRoomRes } from "@/types"
import Axios from "../axios"
import _ from "lodash"

export type CreateResidentInput = Omit<Resident, "status">



export const CREATE_RESIDENT = async (info: CreateResidentInput) => {
    try {
        const response: ApiResponse<ResidentRes> = await Axios({
            method: "POST",
            url: `/resident/`,
            data: info,
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

export const GET_RESIDENT_BY_ID = async (id: string, token: string) => {

    try {
        const response: ApiResponse<ResidentRes> = await Axios({
            method: "GET",
            url: `/resident/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const GET_RESIDENTS_BY_ROOM = async (id: string, token: string) => {

    try {
        const response: ApiResponse<ResidentRes[]> = await Axios({
            method: "GET",
            url: `/resident/room/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const GET_RESIDENTS = async (token: string) => {

    try {
        const response: ApiResponse<ResidentWithRoomRes[]> = await Axios({
            method: "GET",
            url: `/resident/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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


export const DELETE_RESIDENT = async (id: string, token: string) => {

    try {
        const response: ApiResponse<ResidentRes> = await Axios({
            method: "DELETE",
            url: `/resident/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const APPROVE_RESIDENT = async (id: string, token: string) => {

    try {
        const response: ApiResponse<ResidentRes> = await Axios({
            method: "PATCH",
            url: `/resident/approve/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const REJECT_RESIDENT = async (id: string, token: string) => {

    try {
        const response: ApiResponse<ResidentRes> = await Axios({
            method: "PATCH",
            url: `/resident/reject/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const CHANGE_RESIDENT_ROOM = async (room: string, id: string, token: string) => {

    try {
        const response: ApiResponse<ResidentRes> = await Axios({
            method: "PATCH",
            url: `/resident/change-room/${id}`,
            data: {
                room,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
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