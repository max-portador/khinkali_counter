import React from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../store";
import {fetchEvents} from "../store/reducers/eventsReducer";
import {auth} from "../store/reducers/authReducer";
import {parseCookies} from "../utils/helpers";

const Index = () => {
    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}

export default Index


export const getServerSideProps = wrapper.getServerSideProps(store => async ({res, req}) => {
    const data = parseCookies(req)
    console.log("data", data)

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=19, stale-while-revalidate=59'
    )
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchEvents())

    return null
})