import axios from "axios";
import {ILoginResponse} from "./authApi";


// export const serverURL = process.env.SERVER_URL || 'http://localhost:5555';
export const serverURL = process.env.SERVER_URL || 'http://localhost:5555/';

export const instance = axios.create({
    baseURL: '/api'
})

export const instanceSSR = axios.create({
    baseURL: serverURL,
    withCredentials: true
})

instance.interceptors.request.use( (config) => {
    const at = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${at}`
    return config
})

instance.interceptors.response.use( (config) => config,
    async (error) => {
        const originalRequest = error.config
        console.log('error ' + error.toString())
        if (error?.response?.status == 401 && !error?.config?._isRetry){
            originalRequest._isRetry = true
            try {
                let response = await axios.get< ILoginResponse >('/auth/refresh')
                localStorage.setItem('token', response.data?.access_token)
                return instance.request(originalRequest)
            }
            catch (e) {
                console.log('Не авторизован')
            }
        }
        throw error
    })


