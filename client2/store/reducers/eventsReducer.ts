import {IEvent} from "../../types/event";
import {InferActionsType, RootState} from "../index";
import {eventsAPI} from "../../api/eventsApi";
import {ThunkAction} from "redux-thunk";
import {StatusCode} from "../../types/response";

const initialState = {
    events: [] as IEvent[]
}

const eventsReducer = (state = initialState, action: EventsActionsType): EventsStateType => {
    switch (action.type) {
        case EventsActionsTypeEnum.GET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case EventsActionsTypeEnum.UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map( event => event._id === action.payload._id
                                                    ? action.payload
                                                    : event )
            }
        case EventsActionsTypeEnum.DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter( event => event._id !== action.payload)
            }
        default:
            return state
    }

}


export const eventsActions = {
    setEvents: (payload: IEvent[]) => ({
        type: EventsActionsTypeEnum.GET_EVENTS, payload
    } as const),
    updateEvent: (payload: IEvent) => ({
        type: EventsActionsTypeEnum.UPDATE_EVENT, payload
    } as const),
    deleteEvent: (payload: string) => ({
        type: EventsActionsTypeEnum.DELETE_EVENT, payload
    } as const),
}

export const fetchEvents = (): ThunkAction<void, RootState, unknown, EventsActionsType> =>
    async (dispatch) => {
    try{
        const events = await eventsAPI.fetchEvents()
        if (events)
        dispatch(eventsActions.setEvents(events))

    } catch (e) {
        console.log(e, "Произошла ошибка при попытке обновить reduxStore")
    }
}

export const createEvent = (formData: FormData): ThunkAction<void, RootState, unknown, EventsActionsType> =>
    async (dispatch) => {
        try{
            const event = await eventsAPI.create(formData)
            if (event){
                dispatch(fetchEvents())
                return event
            }

        }
        catch (e) {
            console.log(e, "Произошла ошибка при попытке обновить событие")
        }
    }

export const updateEvent = (formData: FormData): ThunkAction<void, RootState, unknown, EventsActionsType> =>
    async (dispatch) => {
        try{
            const event = await eventsAPI.update(formData)
            dispatch(eventsActions.updateEvent(event))
        }
        catch (e) {
            console.log(e, "Произошла ошибка при попытке обновить событие")
        }
}

export const deleteEvent = (id: string): ThunkAction<void, RootState, unknown, EventsActionsType> =>
    async (dispatch) => {
        try {
            let status = await eventsAPI.delete(id)
            if (status === StatusCode.OK){
                dispatch(eventsActions.deleteEvent(id))
            }

        }
        catch (e) {
            console.log(e, 'Произошла ошибка при попытке удалить событие')
        }
    }



export default eventsReducer;

export type EventsStateType = typeof initialState

export enum EventsActionsTypeEnum {
    GET_EVENTS = 'GET_EVENTS',
    UPDATE_EVENT = 'UPDATE_EVENT',
    DELETE_EVENT = 'DELETE_EVENT'
}

export type EventsActionsType = InferActionsType<typeof eventsActions>