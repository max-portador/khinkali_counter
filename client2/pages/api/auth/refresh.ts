import {NextApiRequest, NextApiResponse} from "next";
import {instanceSSR} from "../../../api/baseApi";
import {ILoginResponse} from "../../../api/authApi";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ILoginResponse>
) {
    console.log('SSR REFRESH')
    try {
        let backendRes = await instanceSSR.get<ILoginResponse>('auth/refresh')
        res.status(200).json(backendRes.data)
    }
    catch (error) {
        if (error.response.status == 401) {
            return res.status(401)
        } else {
            return error
        }

    }
}