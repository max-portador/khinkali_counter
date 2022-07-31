import {instance} from "./baseApi";
import {IUserDetail} from "../types/user";


export const authApi = {
    login: async (email: string, password: string): Promise<IUserDetail> => {
        try {
            const response = await instance.post<ILoginResponce>('/auth/login', {
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
            if (data ){
                return true
            }
            else throw new Error()
        } catch
            (e: any) {
            alert(e)
        }
    },

    checkAuth: async (user: IUserDetail): Promise<IUserDetail> => {
        try{
            const response  = await instance.post<ILoginResponce>('/auth/refresh', {
                user
            })
            localStorage.setItem('token', response.data?.access_token)
            return response.data.user
        }
        catch (e) {
            console.log(e.response?.data?.message)
        }
    }


}


export interface ILoginResponce {
    user: IUserDetail;
    access_token: string;
}

