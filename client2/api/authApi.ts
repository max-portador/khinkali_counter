import {instance} from "./baseApi";
import axios from "axios";

export const authApi = {
    login: async (email: string, password: string): Promise<string> => {
        try {
            const response = await instance.post<ILoginResponse>('auth/login', {
                email,
                password
            })

            await fetch('/auth/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'token': response.data.token})
            })
            localStorage.setItem('token', response.data.token)

            instance.defaults.headers.post['Authorization'] = `Bearer ${response.data.token}`
            instance.defaults.headers.delete['Authorization'] = `Bearer ${response.data.token}`
            instance.defaults.headers.put['Authorization'] = `Bearer ${response.data.token}`
            return response.data.user
        } catch
            (e: any) {
            console.log(e + ' Произошла ошибка при попытке авторизации')
        }
    },

    auth: async (): Promise<string | null> => {
        try {
            let token = localStorage.getItem('token')
            const response = await instance.get<IAuthResponse>(`auth/${token}`)
            const data = await response.data
            if (data.exp > Date.now()) {
                localStorage.removeItem('token')
                return null
            }
            return data.user.name
        } catch (e) {
            console.log(e + ' Произошла ошибка при попытке авторизации')
        }
    }
}


export interface ILoginResponse {
    token: string,
    user: string
}

export interface IAuthResponse {
    user: { name: string }
    exp: number
}