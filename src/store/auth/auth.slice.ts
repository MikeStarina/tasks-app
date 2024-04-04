import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TLoginResponse, TUser } from "../../utils/types";

interface IInitialState {
    loginFormData: {
        identifier: string,
        password: string,
    },
    isAuthenticated: boolean,
    userToken: string,
    user?: TUser,
}


const initialState: IInitialState = {
    loginFormData: {
        identifier: '',
        password: '',
    },
    isAuthenticated: false,
    userToken: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLoginFormData: (state, action: PayloadAction<{id: string, value: string}>) => {
            const { id, value } = action.payload;
            return {
                ...state,
                loginFormData: {
                    identifier: id === 'username' ? value : state.loginFormData.identifier,
                    password: id === 'password' ? value : state.loginFormData.password
                }
            }
        },
        setLoginResponseUserData: (state, action: PayloadAction<any>) => {

            return {
                ...state,
                loginFormData: {
                    identifier: '',
                    password: '',
                },
                userToken: action.payload.jwt,
                user: action.payload.user,
                isAuthenticated: true,
            }
        },
        setUserToken: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                userToken: action.payload
            }
        },
        setUserData: (state, action: PayloadAction<TUser>) => {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        }
    }
})


export const {actions, reducer} = authSlice;