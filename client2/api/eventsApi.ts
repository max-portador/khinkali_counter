import {IEvent} from "../types/event";
import {fetcher, instance} from "./baseApi";
import {fetcherSSR} from "./fetcherSSR";
import {RequestFunc, StatusCode} from "../types/req_res";

export const eventsAPI = {
    fetchEventsSSR: async(req, res): Promise<IEvent[]> => {
        try {
            let [errors, events] = await fetcherSSR.get<IEvent[]>(req, res, 'events')
            if (!errors && events) {
                return events
            }
            else {
                throw errors
            }
        } catch (e) {
            throw e
        }
    },

    fetchEvents: async(): Promise<IEvent[]> => {
        try {
            const request: RequestFunc = () => instance.get('events')
            let [errors, events] = await fetcher<IEvent[]>(request)
            if (!errors && events) {
                return events
            }
            else {
                throw errors
            }
        } catch (e) {
            throw e
        }
    },

    create: async(formData: FormData): Promise<IEvent> => {
        try {
            const request: RequestFunc = () => instance.post<IEvent>('/events', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })

            const [errors, events] = await fetcher<IEvent>(request)


            if (!errors && events) {
                return events
            }
            else {
                throw errors
            }
        }
        catch (e) {
            throw e
        }
    },

    update: async(formData: FormData): Promise<IEvent> => {
        try {

            const request: RequestFunc = () => instance.put<IEvent>('/events', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })

            const [errors, events] = await fetcher<IEvent>(request)

            if (!errors && events) {
                return events
            }
            else {
                throw errors
            }
        }
        catch (e) {
            throw e
        }
    },

    delete: async (id: string): Promise<StatusCode> => {
        try {
            const request: RequestFunc = () => instance.delete<string>(`/events/${id}`)
            const [errors, removed_id] = await fetcher<string>(request)


            if (!errors && removed_id) {
                return StatusCode.OK
            }
            else {
                throw errors
            }
        }
        catch (e) {
            throw e
        }
    }
}