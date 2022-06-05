import React, {FC} from 'react';
import css from '../../styles/Timeline.module.css';
import {IconButton} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {ArrowForwardIosRounded} from "@mui/icons-material";
import {ModifiedEvent} from "../../types/event";
import {daysDiff, EditOptions, formatDate} from "../../utils/dateHelper";
import styled from "styled-components";
import {LineItem} from "./LineItem";


const Timeline: FC<PropsType> = ({active, setActive, events}) => {

    const clickHandler = function (index: number) {
        setActive(([prev, direction]) => {
            const newDirection = prev - index > 0 ? -1000 : 1000
            return [index, newDirection]
        })
    }

    const getTimeDistance = (i: number): number => {
        return daysDiff(events[0].date, events[i].date)
    }

    const scaleWidth = () => {
        if (active === 0) { return 0 }
        return 20 * getTimeDistance(active) + 15 * active - 7
    }


    return (
        <>
            {/*<h2>{events[active].amount}</h2>*/}
            <h2>{scaleWidth()}</h2>
            <div className={css.wrapper}>
                <IconButton aria-label="back">
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
                <Container>
                    <div className={css.scale}
                         style={{
                             width: scaleWidth() + 'px',
                             transition: 'width .3s linear'
                         }}
                    />
                    <div className={css.progressbar}>
                        {
                            events.map((event, i) => (
                                <LineItem key={formatDate(event.date, EditOptions)}
                                          total={events.length}
                                          event={event}
                                          i={i}
                                          clickHandler={clickHandler}
                                          active={active}
                                >
                                    {formatDate(event.date, EditOptions)}
                                </LineItem>
                            ))
                        }
                    </div>
                </Container>
                <IconButton aria-label="forward">
                    <ArrowForwardIosRounded/>
                </IconButton>
            </div>
        </>
    );
}

export default Timeline;

type PropsType = {
    active: number,
    setActive: React.Dispatch<React.SetStateAction<[number, number]>>,
    events: ModifiedEvent[]
}

const Container = styled.div`
  width: 65vw;
  height: 15vh;
  overflow-x: hidden;
`


