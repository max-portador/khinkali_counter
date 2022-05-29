import {IEvent} from "../../types/event";
import {InferActionsType} from "../index";
import {Dispatch} from "redux";
import {eventsAPI} from "../../api/eventsApi";

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
        default:
            return state
    }

}


export const eventsActions = {
    getEvents: (payload: IEvent[]) => ({
        type: EventsActionsTypeEnum.GET_EVENTS, payload
    } as const),
}

export const fetchEvents = () =>
    async (dispatch: Dispatch<EventsActionsType>) => {
    try{
        const events = await eventsAPI.fetchEvents()
        dispatch(eventsActions.getEvents(events))

    } catch (e) {
        console.log(e, "Произошла ошибка при попытке обновит reduxStore (g)")
    }
}


export default eventsReducer;

export type EventsStateType = typeof initialState

export enum EventsActionsTypeEnum {
    GET_EVENTS = 'GET_EVENTS'
}

export type EventsActionsType = InferActionsType<typeof eventsActions>