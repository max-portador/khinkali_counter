import {createEvent, deleteEvent, fetchEvents, updateEvent} from "../store/slices/events/actionCreators";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {bindActionCreators} from "redux";
import {authSlice} from "../store/slices/auth/authReducer";
import {login, logout} from "../store/slices/auth/actionCreators";
import {eventsSlice} from "../store/slices/events/eventsReducer";

const ActionCreators = {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    ...eventsSlice.actions,
    login,
    logout,
    ...authSlice.actions
}

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(ActionCreators, dispatch)
}