import {createEvent, deleteEvent, eventsActions, fetchEvents, updateEvent} from "../store/reducers/eventsReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {bindActionCreators} from "redux";
import {authActions, login, logout, me} from "../store/reducers/authReducer";

const ActionCreators = {
    ...eventsActions,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    ...authActions,
    login,
    logout,
    me
}

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(ActionCreators, dispatch)
}