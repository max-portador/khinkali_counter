import {Box, Grid} from '@mui/material';
import React from 'react';
import MainLayout from "../../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchEvents} from "../../store/reducers/eventsReducer";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import EvenCard from "../../components/EvenCard";
import {sortEventByDate} from "../../utils/dateHelper";


const EventList = () => {
    const {events} = useTypedSelectors(state => state.event)

    return (
        <MainLayout marginLeft={120}>
            <Grid container justifyContent='center'>
                <Box style={{width: 900}}>
                    <Box p={4}>
                        <Grid container justifyContent='center'>
                            <h1>Список событий</h1>
                        </Grid>
                    </Box>
                    <Grid container justifyContent='center' gap={7} mb={5}>
                        {
                            events
                                .sort(sortEventByDate)
                                .map(event =>  <EvenCard key={event._id} event={event}/>)
                        }
                    </Grid>

                </Box>
            </Grid>
        </MainLayout>
    );
};

export default EventList;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchEvents())
    return null
})



