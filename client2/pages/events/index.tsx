import {Box, Card, CardContent, CardHeader, CardMedia, Grid, Stack, Typography} from '@mui/material';
import React from 'react';
import MainLayout from "../../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchEvents} from "../../store/reducers/eventsReducer";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import {URL} from "../../api/baseApi";

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const EventList = () => {
    const {events} = useTypedSelectors(state => state.event)
    const formatDate = (date: Date) => new Date(date).toLocaleString("ru", options)


    return (
        <MainLayout>
            <Grid container justifyContent='center'
            >
                <Card style={{width: 900}}>
                    <Box p={8}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список событий</h1>
                        </Grid>
                    </Box>
                    <Stack spacing={14} >
                        {
                            events.map(event =>
                                <Card sx={{justifyItems:'center', display: 'flex', flexDirection: 'column'}}>
                                    <CardHeader
                                        title={formatDate(event.date)}
                                    />
                                    <CardMedia
                                        component="img"
                                        image={URL + '/' + event.imageName}
                                        height='200'
                                        sx={{
                                            objectFit: "scale-down"
                                        }}
                                    />
                                    <CardContent >
                                        <Typography variant='h3'>
                                            {event.amount}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            )
                        }
                    </Stack>

                </Card>
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

