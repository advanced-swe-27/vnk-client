import { ApiResponse, LoginUserInput, ResetPasswordInput, SendCodeInput, UserRes, VerifyCodeInput } from "@/types"
import Axios from "../axios"





export const LOGIN_USER = async(info: LoginUserInput) => {
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "POST",
            url: `/auth/login`,
            data: info
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

export const RESET_PASSWORD = async (info: ResetPasswordInput) => {
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "POST",
            url: `/auth/reset-password`,
            data: info
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

export const SEND_VERIFICATION_CODE = async (info: SendCodeInput) => {
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "POST",
            url: `/auth/send-code`,
            data: info
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

export const VERIFY_CODE = async (info: VerifyCodeInput) => {
    try {
        const response:  ApiResponse<UserRes> = await Axios({
            method: "POST",
            url: `/auth/verify-code`,
            data: info
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