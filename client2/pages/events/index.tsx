import {Box, Grid} from '@mui/material';
import React, {useEffect} from 'react';
import MainLayout from "../../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchEvents} from "../../store/reducers/eventsReducer";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import EvenCard from "../../components/EvenCard";
import {sortEventByDate} from "../../utils/dateHelper";
import {useActions} from "../../hooks/useActions";
import {IEvent} from "../../types/event";


const EventList = () => {
    const {events} = useTypedSelectors(state => state.event)
    const {fetchEvents} = useActions()

    useEffect(() => {
        fetchEvents()
    }, [])

    const addMinAmount = (acc, event: IEvent) => {
        let modifiedEvent = {...event, minAmount: acc.minAmount}
        acc.minAmount = event.amount + 1;
        acc.events.push(modifiedEvent)
        return acc
    }

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
                           events && events
                                .sort(sortEventByDate)
                                .reduce(addMinAmount, {minAmount: 1, events: []})
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

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchEvents())
//     return null
// })



