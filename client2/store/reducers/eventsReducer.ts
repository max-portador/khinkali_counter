import {IEvent} from "../../types/event";
import {InferActionsType, RootState} from "../index";
import {eventsAPI} from "../../api/eventsApi";
import {ThunkAction} from "redux-thunk";

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
                events: state.events.map( event =>
                    event._id === action.payload._id
                        ? action.payload
                        : event
                )

            }
        default:
            return state
    }

}


export const eventsActions = {
    getEvents: (payload: IEvent[]) => ({
        type: EventsActionsTypeEnum.GET_EVENTS, payload
    } as const),
    updateEvent: (payload: IEvent) => ({
        type: EventsActionsTypeEnum.UPDATE_EVENT, payload
    } as const),
}

export const fetchEvents = (): ThunkAction<void, RootState, unknown, EventsActionsType> =>
    async (dispatch) => {
    try{
        const events = await eventsAPI.fetchEvents()
        dispatch(eventsActions.getEvents(events))

    } catch (e) {
        console.log(e, "Произошла ошибка при попытке обновить reduxStore")
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


export default eventsReducer;

export type EventsStateType = typeof initialState

export enum EventsActionsTypeEnum {
    GET_EVENTS = 'GET_EVENTS',
    UPDATE_EVENT = 'UPDATE_EVENT'
}

export type EventsActionsType = InferActionsType<typeof eventsActions>