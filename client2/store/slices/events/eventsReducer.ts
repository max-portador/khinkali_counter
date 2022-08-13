import {IEvent} from "../../../types/event";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createEvent, deleteEvent, fetchEvents, updateEvent} from "./actionCreators";
import {InferActionsType} from "../../index";

const initialState = {
    events: [] as IEvent[]
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload
        }
    },
    extraReducers: {
        [fetchEvents.fulfilled.type]: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload
        },

        [createEvent.fulfilled.type]: (state, action: PayloadAction<IEvent>) => {
            state.events.push(action.payload)
        },

        [updateEvent.fulfilled.type]: (state, action: PayloadAction<IEvent>) => {
            const idx = state.events.findIndex( event => event._id === action.payload._id)
            state.events[idx] = action.payload
        },

        [deleteEvent.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event._id !== action.payload)
        },

    }
})

export default eventsSlice.reducer
export type EventsStateType = typeof initialState
