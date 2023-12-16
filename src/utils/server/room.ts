import { ApiResponse,  Room, RoomRes } from "@/types"
import Axios from "../axios"
import _ from "lodash"


export const CREATE_ROOM = async (info: Room) => {
    try {
        const response: ApiResponse<RoomRes> = await Axios({
            method: "POST",
            url: `/room/`,
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

export const UPDATE_ROOM = async (id: string,info: Room) => {
    try {
        const response: ApiResponse<RoomRes> = await Axios({
            method: "POST",
            url: `/room/${id}`,
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

export const GET_ROOM_BY_ID = async (id: string, token: string) => {

    try {
        const response: ApiResponse<RoomRes> = await Axios({
            method: "GET",
            url: `/room/${id}`,
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



export const GET_ROOMS = async (token: string) => {

    try {
        const response: ApiResponse<RoomRes[]> = await Axios({
            method: "GET",
            url: `/room/`,
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


export const DELETE_ROOM = async (id: string, token: string) => {

    try {
        const response: ApiResponse<RoomRes> = await Axios({
            method: "DELETE",
            url: `/room/${id}`,
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

