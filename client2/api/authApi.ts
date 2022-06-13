import {instance} from "./baseApi";


export const authApi = {
    login: async (email: string, password: string): Promise<string> => {
        try {
            const response = await instance.post<ILoginResponce>('auth/login', {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            return response.data.user
        } catch
            (e: any) {
            alert(e)
        }
    },
}


export interface ILoginResponce {
    token: string,
    user: string
}