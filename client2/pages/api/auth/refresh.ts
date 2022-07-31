import {NextApiRequest, NextApiResponse} from "next";
import {instanceSSR} from "../../../api/baseApi";
import {ILoginResponce} from "../../../api/authApi";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ access_token: string }>
) {
    let backendRes = await instanceSSR.post<ILoginResponce>('auth/refresh' )
    let access_token = backendRes.data.access_token
    res.status(200).json({ access_token} )
}