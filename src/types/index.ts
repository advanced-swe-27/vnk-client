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

export type VoidFunction = () => void;

export type UserRoles = "SUDO" | "ADMIN" | "PORTER"
export type KeyStatus = "assigned" | "unassigned" | "missing" | "unknown"
export type ResidentStatus = "pending" | "approved" | "rejected"


export type Gender = "MALE" | "FEMALE"

export type Level = "100" | "200" | "300" | "400" | "500" | "600" | "700"

export type MongoResponse = {
    _id: string
    createdAt: Date
    updatedAt: Date
    __v?: number
}

export type ForgotStoreType = {
    username?: string
    tab: "send-code" | "verify-code" | "reset-password"
    token?: string
}


export type User = {
    surname: string
    othernames: string
    email: string
    password: string
    role: UserRoles
    token: string
    phone: string
    isFirstLogin: boolean
}

export type Resident = {
    surname: string
    othernames: string
    dob: Date
    email: string
    sid: string
    programme: string
    level: Level
    imageUrl: string
    phone: string
    gender: Gender
    status: ResidentStatus
    room: string
}

export type ResidentWithRoom = Resident & {
    room: Room
}

export type Visitor = {
    surname: string
    othernames: string
    phone: string
    email: string
    residence: string
    sid?: string
    isStudent: boolean
    flagged: boolean
}

export type Room = {
    num: string
    capacity: number
    gender: Gender
}

export type Facility = {
    name: string
    description: string
}

export type Key = {
    room: Room | string
    status: KeyStatus
}

export type VisitLog = {
    visitor: Visitor
    checkout: Date | null
    room:  Room 
}

export type KeyLog = {
    closedBy?:  Resident
    openedBy:  Resident
    closedAt?: Date
    room:  RoomRes
}


export type UserRes = User & MongoResponse
export type ResidentRes = Resident & MongoResponse
export type ResidentWithRoomRes = ResidentWithRoom & MongoResponse
export type VisitorRes = Visitor & MongoResponse
export type RoomRes = Room & MongoResponse
export type FacilityRes = Facility & MongoResponse
export type KeyRes = Key & MongoResponse
export type VisitLogRes = VisitLog & MongoResponse
export type KeyLogRes = KeyLog & MongoResponse


export type CreateUserInput = {
    othernames: string
    surname: string
    email: string
    phone: string
    // role: UserRoles
}

export type LoginUserInput = {
    email: string
    password: string
}

export type ChangePasswordInput = {
    email: string
    oldPassword: string
    newPassword: string
}

export type ResetPasswordInput = Pick<ChangePasswordInput, "newPassword"> & {
    email: string
}

export type SendCodeInput = Pick<LoginUserInput, "email">

export type VerifyCodeInput = SendCodeInput & {
    code: string
}


export type UpdateUserDetailsInput = Pick<User, "surname" | "othernames" | "phone">

export type CreateResidentInput = Omit<Resident, "status">

export type OpenKeyLogInput = {
    openedBy: string,
    room: string
}

export type CloseKeyLogInput = {
    closedBy: string
}

