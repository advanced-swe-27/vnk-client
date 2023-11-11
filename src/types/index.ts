// All reusable types will go here
import { AxiosResponse } from "axios"

export type Action = {
    type: string;
    payload: any;
};

export type State = {
    user: any;
    role: any
};

export type ApiResponse<T> = AxiosResponse<{
    success: boolean,
    message: string
    data: T
}>