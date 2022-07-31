import type { NextApiRequest, NextApiResponse } from 'next'
import {instanceSSR} from "../../../api/baseApi";
import {IUserDetail} from "../../../types/user";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    let { user } = req.body as { user: IUserDetail }

    try {
        let backendRes = await instanceSSR.post('auth/logout', {
            user
        },
            {
                headers: {
                    'authorization': `${req.headers?.authorization}`
                }

            })
        let data = backendRes.data

        res.status(200).json(data)
    }
    catch (e) {
        res.status(401).send(e)
    }


}

function extractToken(req: NextApiRequest): any{
    const Authorization = req?.headers?.authorization as string | undefined
    if (Authorization){
        return Authorization.split(' ').pop();
    }
    return '';
}