import axios, {AxiosResponse} from "axios";
import {QueryResponse, RequestFunc, StatusCode} from "../types/req_res";


export const serverURL = process.env.SERVER_URL || 'http://localhost:5555';
// export const serverURL = process.env.SERVER_URL

export const instance = axios.create({
    baseURL: serverURL,
    withCredentials: true
})

const refreshTokens = async () => {
    await instance.get('auth/refresh')
}


const handleRequest = async <T>(request: RequestFunc): Promise<AxiosResponse<T>> => {
    try {
        return await request()
    }
    catch (error) {
        if (error?.response?.status === StatusCode.Unauthorized){
            await refreshTokens()
            try {
                return await request()
            }
            catch (innerError) {
                console.log('Ошибка при обновлении токена ' + innerError?.message)
            }

            console.log('Bad Request: ' + error)
        }
    }
}

export const fetcher = async <T>(request: RequestFunc): Promise<QueryResponse<T>> => {
    try {
        const res = await handleRequest<T>(request)
        console.log(res.data)
        return [null, res.data]
    }
    catch (e) {
        return [e, null]
    }


}

