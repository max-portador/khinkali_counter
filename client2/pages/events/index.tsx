import {Button, Grid} from '@mui/material';
import React, {ChangeEvent} from 'react';
import MainLayout from "../../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchEvents} from "../../store/reducers/eventsReducer";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import EvenCard from "../../components/EvenCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from "styled-components";
import {useRouter} from "next/router";
import {preparedEvents} from "../../utils/events";
import {CenteredStack} from "./create";


const EventList = () => {
    const {events} = useTypedSelectors(state => state.event)
    const router = useRouter()
    const clickButtonHandler = async (e: ChangeEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        await router.push('events/create')
    }

    return (
        <MainLayout>
            <Grid container justifyContent='center'>
                <CenteredStack width={1200}  >
                    <Grid container justifyContent='center' p={4}>
                        <h1>Список событий</h1>
                    </Grid>
                    <CenteredStack direction={'column'} gap={3} >
                        {
                            events && preparedEvents(events)
                                .map(event => <EvenCard key={event._id} event={event}/>)
                        }
                    </CenteredStack>
                </CenteredStack>
            </Grid>
                <AddButton onClick={clickButtonHandler}>
                    Добавить событие
                </AddButton>
        </MainLayout>
    );
};

export default EventList;
//
// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchEvents())
//     return null
// })

const AddButton = styled((props) => <Button size='small' variant={'contained'}
                                            {...props} startIcon={<AddCircleIcon/>}/>)`
  position: fixed;
  right: 3em;
  bottom: 10%;
  line-height: 30px;
  border-radius: 10px;
`


