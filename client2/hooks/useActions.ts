import {deleteEvent, eventsActions, fetchEvents, updateEvent} from "../store/reducers/eventsReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {bindActionCreators} from "redux";

const ActionCreators = {
    ...eventsActions,
    fetchEvents,
    updateEvent,
    deleteEvent,
}

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(ActionCreators, dispatch)
}