import {NextApiRequest, NextApiResponse} from "next";
import {IEvent} from "../../types/event";
import {instanceSSR} from "../../api/baseApi";

export default function handler(req: NextApiRequest,
                                res: NextApiResponse<any>) {
    if (req.method === 'GET') {
        return getHandler(req, res)
    }
    if (req.method === 'POST') {
        // Process a POST request
    }
    if (req.method === 'PUT') {
        // Process a POST request
    }
    if (req.method === 'DELETE') {
        // Process a POST request
    }
}

async function getHandler(req: NextApiRequest,
                    res: NextApiResponse<IEvent[]>){

    const backendRequest = await instanceSSR.get<IEvent[]>('/events')
    res.status(200).json(backendRequest.data)
}