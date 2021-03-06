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
        try {
            const token = localStorage.getItem('token')
            const response = await instance.post<IEvent>('/events', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data' ,
                        'Authorization': `Bearer ${token}`
                    }
                })
            return response.data
        }
        catch (e) {
            console.log(e, 'Произошла ошибка при создании события')
        }
    },

    update: async(formData: FormData): Promise<IEvent> => {
        try {
            const token = localStorage.getItem('token')

            const response = await instance.put<IEvent>('/events', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
            return response.data
        }
        catch (e) {
            console.log(e, 'Произошла ошибка при создании события')
        }
    },

    delete: async (id: string): Promise<number> => {
        try {
            const token = localStorage.getItem('token')
            const response = await instance.delete<string>(`/events/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.status
        }
        catch (e) {
            console.log(e, 'Произошла ошибка при удалении события')
        }
    }
}