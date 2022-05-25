import {IEvent} from "../types/event";
import {instance} from "./baseApi";

export const eventsAPI = {
    fetchEvents: async(): Promise<IEvent[]> => {
        try {
            const response = await instance.get<IEvent[]>('/events')
            return response.data;
        } catch (e) {
            console.log(e, 'Произошла ошибка при запросе событий')
        }

    }

}