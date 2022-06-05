import React, {FC, useEffect, useState} from 'react';
import Timeline from "./TimeLine/Timeline";
import ImageGallery from "./ImageGallery";
import {NextThunkDispatch, wrapper} from "../store";
import {fetchEvents} from "../store/reducers/eventsReducer";
import {useTypedSelectors} from "../hooks/useTypedSelectors";
import {preparedEvents} from "../utils/events";
import {NextPage, NextPageContext} from "next";
import {useActions} from "../hooks/useActions";
import {Stack} from "@mui/material";


const HomePage: FC = () => {
    const {events} = useTypedSelectors(state => state.event)
    const modifiedEvents = preparedEvents(events)

    // const {fetchEvents} = useActions()
    // useEffect(() => {fetchEvents()}, [])


    const [[activeEvent, direction], setEvent] = useState<[number, number]>([0, 0])

    const paginate = (newDirection: number) => {
        setEvent([activeEvent + newDirection, newDirection]);
    }

    return <>
        <Stack width={1200}>
            <Timeline
                active={activeEvent}
                setActive={setEvent}
                events={modifiedEvents}
            />
            <ImageGallery
                active={activeEvent}
                direction={direction}
                events={modifiedEvents}
                setEvent={setEvent}
                paginate={paginate}
            />
        </Stack>
    </>
};

export default HomePage;
