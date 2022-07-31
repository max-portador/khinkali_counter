import React, {useEffect} from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../store";
import {fetchEvents} from "../store/reducers/eventsReducer";
import {checkAuth} from "../store/reducers/authReducer";
import axios from "axios";
import {instance} from "../api/baseApi";
import {useDispatch} from "react-redux";
import {useActions} from "../hooks/useActions";

const Index = () => {
    const { fetchEvents} = useActions()
    useEffect(() => {
        fetchEvents()
    }, [])
    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}

export default Index


// export const getServerSideProps = wrapper.getServerSideProps(store => async ({res}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     // const {user, isAuth } = store.getState().auth
//     // if (!isAuth){
//     //     await dispatch(await checkAuth(user))
//     // }
//     console.log('1')
//     await axios.get('api/events')
//
//     return null
// })