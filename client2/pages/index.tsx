import React, {useEffect} from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../store";
import {eventsActions} from "../store/reducers/eventsReducer";
import {me} from "../store/reducers/authReducer";
import {instanceSSR} from "../api/baseApi";
import {IEvent} from "../types/event";

const Index = () => {
    useEffect(() => {
        me()
        console.log('me!!!')
    }, [])

    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}

export default Index


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        const dispatch = store.dispatch as NextThunkDispatch

        try {
            let response = await instanceSSR.get<IEvent[]>('/events')
            let events = response.data
            dispatch(eventsActions.setEvents(events))
        } catch (e) {
            console.log('FFFFFFFFFFFFFFFFFF')
            console.log(e?.message)
        }

        return null
    })