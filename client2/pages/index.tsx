import React from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../store";
import {fetchEvents} from "../store/reducers/eventsReducer";

const Index = () => {
    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}




export default Index


export const getServerSideProps = wrapper.getServerSideProps(store => async ({res}) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=59, stale-while-revalidate=99'
    )
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchEvents())
    return null
})