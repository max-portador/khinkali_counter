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

    },

    create: async(formData: FormData): Promise<IEvent> => {
        console.table(formData)
        try {
            const response = await instance.post<IEvent>('/events', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data
        } catch (e) {
            console.log(e, 'Произошла ошибка при создании события')
        }
    }


}