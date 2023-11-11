import { State, Action } from "@/types";

const actionTypes = {
    SET_ROLE: "SET_ROLE",
    SET_USER: "SET_USER",
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case actionTypes.SET_ROLE:
            return {
                ...state,
                role: action.payload
            }
    }
}