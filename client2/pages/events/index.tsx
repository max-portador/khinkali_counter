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
            <Grid container justifyContent='center' >
                <Box style={{width: 900}}>
                    <Box p={4}>
                        <Grid container justifyContent='center'>
                            <h1>Список событий</h1>
                        </Grid>
                    </Box>
                    <Grid container direction={'column'} gap={3} justifyContent={'center'} justifyItems={'center'}>
                        {
                            events
                                .sort(sortEventByDate)
                                .reduce((acc, event) => {
                                    let modifiedEvent = {...event, minAmount: acc.minAmount}
                                    acc.minAmount = event.amount + 1;
                                    acc.events.push(modifiedEvent)
                                    return acc
                                }, {minAmount: 1, events: []})
                                .events
                                .map(event =>
                                    <Grid key={event._id}  container justifyContent={'center'}>
                                        <EvenCard event={event}/>
                                    </Grid>


                                )

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



