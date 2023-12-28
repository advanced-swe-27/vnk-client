import { ApiResponse, Facility, FacilityRes } from "@/types"
import Axios from "../axios"
import _ from "lodash"


export const CREATE_FACILITY = async (info: Facility, token: string) => {
    try {
        const response: ApiResponse<FacilityRes> = await Axios({
            method: "POST",
            url: `/facility/`,
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

export const UPDATE_FACILITY = async (id: string, info: Facility, token: string) => {
    try {
        const response: ApiResponse<FacilityRes> = await Axios({
            method: "POST",
            url: `/facility/${id}`,
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

export const GET_FACILITY_BY_ID = async (id: string, token: string) => {

    try {
        const response: ApiResponse<FacilityRes> = await Axios({
            method: "GET",
            url: `/facility/${id}`,
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



export const GET_FACILITIES = async (token: string) => {
    try {
        const response: ApiResponse<FacilityRes[]> = await Axios({
            method: "GET",
            url: `/facility/`,
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


export const DELETE_FACILITY = async (id: string, token: string) => {

    try {
        const response: ApiResponse<FacilityRes> = await Axios({
            method: "DELETE",
            url: `/facility/${id}`,
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

