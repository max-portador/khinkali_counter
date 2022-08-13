import React from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../store";
import {useActions} from "../hooks/useActions";
import {eventsAPI} from "../api/eventsApi";
import {IUserDetail} from "../types/user";
import {fetcherSSR} from "../api/fetcherSSR";
import {authSlice} from "../store/slices/auth/authReducer";
import {eventsSlice} from "../store/slices/events/eventsReducer";

const Index = () => {

    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}

export default Index


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, res}) => {

        const dispatch = store.dispatch as NextThunkDispatch

        try {
            let events = await eventsAPI.fetchEventsSSR(req, res)
            if (events?.length ) {
                dispatch(eventsSlice.actions.setEvents(events))
            }

            if (!store.getState().auth.user?.name) {
                let [errors, user] = await fetcherSSR.get<IUserDetail>(req, res, 'auth/me')
                if (!errors && user)
                    dispatch(authSlice.actions.setUser(user))
            }

        } catch (e) {
            console.log(e?.message)
        }

        return null
    })