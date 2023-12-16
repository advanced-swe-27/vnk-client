import { ApiResponse, LoginUserInput, ResetPasswordInput, SendCodeInput, User, UserRes, UserRoles, VerifyCodeInput } from "@/types"
import Axios from "../axios"
import _ from "lodash"
import { rolesMap } from "."

type CreateUserInput = Pick<User, "email" | "othernames" | "surname" | "phone">



export const CREATE_USER = async (info: CreateUserInput, role: UserRoles, token: string) =>{
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "POST",
            url: `/${rolesMap[role]}/`,
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

export const GET_USER_BY_ID = async (id: string, role: UserRoles, token: string) => {
    
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "GET",
            url: `/${rolesMap[role]}/${id}`,
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

export const GET_USERS = async (role: UserRoles, token: string) => {
    
    try {
        const response:  ApiResponse<UserRes[]> = await Axios({
            method: "GET",
            url: `/${rolesMap[role]}/`,
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


export const DELETE_USER = async (id: string, role: UserRoles, token: string) => {
    
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "DELETE",
            url: `/${rolesMap[role]}/${id}`,
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