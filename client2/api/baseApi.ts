import axios from "axios";


// export const serverURL = process.env.SERVER_URL || 'http://localhost:5555';
export const serverURL = process.env.SERVER_URL || 'http://localhost:5555/';

export const instance = axios.create({
    baseURL: '/api'
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
                let response = await instanceSSR.post<{ access_token: string }>('auth/refresh')
                localStorage.setItem('token', response.data?.access_token)
                return instance.request(originalRequest)
            }
            catch (e) {
                console.log('Не авторизован')
            }
        }
        throw error
    })


export const instanceSSR = axios.create({
    baseURL: serverURL,
    withCredentials: true
})
