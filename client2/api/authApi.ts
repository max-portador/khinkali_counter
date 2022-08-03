import {instance} from "./baseApi";
import {IUserDetail} from "../types/user";
import axios from "axios";


export const authApi = {
    login: async (email: string, password: string): Promise<IUserDetail> => {
        try {
            const response = await instance.post<ILoginResponse>('/auth/login', {
                email,
                password
            })
            localStorage.setItem('token', response.data?.access_token)
            return response.data.user
        } catch
            (e: any) {
            alert(e)
        }
    },

    logout: async (user: IUserDetail): Promise<boolean> => {
        try {
            const response = await instance.post<boolean>('/auth/logout', {
                user
            })
            localStorage.removeItem('token')
            const data = await response.data
            if (data) {
                return true
            } else throw new Error()
        } catch
            (e: any) {
            alert(e)
        }
    },

    me: async (): Promise<IUserDetail> => {
        try {
            if (localStorage.getItem('token')) {
                const response = await instance.get<ILoginResponse>('auth/refresh')

                console.table(response.status)
                if (response.status === 200) {
                    localStorage.setItem('token', response.data?.access_token)
                    return response.data.user
                }
                else  { throw new Error()}

            }

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }


}


export interface ILoginResponse {
    user: IUserDetail;
    access_token: string;
}

