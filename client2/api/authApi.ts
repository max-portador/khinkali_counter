import {fetcher, instance} from "./baseApi";
import {IUserDetail} from "../types/user";
import {fetcherSSR} from "./fetcherSSR";


export const authApi = {
    login: async (email: string, password: string): Promise<IUserDetail> => {
        try {

            let request = () => instance.post( 'auth/login', {email, password})

            const [errors, user] = await fetcher<IUserDetail>(request)

            if (!errors && user) {
                return user
            }
            else {
                throw errors
            }
        } catch
            (e: any) {
            alert(e.message)
        }
    },

    logout: async (user: IUserDetail): Promise<boolean> => {
        try {
            const response = await instance.post<boolean>('/auth/logout', {
                userId: user.id
            })
            const data = await response.data
            if (data) {
                return true
            } else throw new Error()
        } catch
            (e: any) {
            alert(e)
        }
    },

    me: async (req, res): Promise<IUserDetail> => {
        try {
            let [errors, user] = await fetcherSSR.get<IUserDetail>(req, res, 'auth/me')
            if (!errors && user){
                return user
            }
            else throw errors

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }


}


export interface ILoginResponse {
    user: IUserDetail;
    access_token: string;
}

