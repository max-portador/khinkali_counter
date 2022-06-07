import React, {FC, useEffect, useRef, useState} from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {ArrowForwardIosRounded} from "@mui/icons-material";
import {ModifiedEvent} from "../../types/event";
import {daysDiff, EditOptions, formatDate} from "../../utils/dateHelper";
import styled from "styled-components";
import {LineItem} from "./LineItem";


const Timeline: FC<PropsType> = ({active, setActive, events}) => {

    const [x, setX] = useState(0)
    const [containerWidth, setContainerWidth] = useState(null)
    let ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref){
           setContainerWidth(ref.current.offsetWidth)
        }
    }, [ref])

    const clickHandler = function (index: number) {
        setActive(([prev, direction]) => {
            const newDirection = prev - index > 0 ? -1000 : 1000
            return [index, newDirection]
        })
    }

    const moveProgressBar = (sh: number) => {
        let delta = Math.sign(sh) * containerWidth
        setX((x) => (x + delta) > 0 ? 0 : x + delta)
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
            <h2>{x}</h2>
            <Wrapper>
                <IconButton aria-label="back"
                            onClick={() =>  moveProgressBar(1)}
                            disabled={x === 0}
                >
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
                <Container ref={ref}>
                    <div style={{
                        transform: `translateX(${x}px)`,
                        transition: 'transform .3s ease-in'
                    }}>
                        <Scale
                             style={{
                                 width: scaleWidth() + 'px',
                                 transition: 'width .3s linear'
                             }}
                        />
                        <ProgressBar >
                            {
                                events.map((event, i) => (
                                    <LineItem key={formatDate(event.date, EditOptions)}
                                              total={events.length}
                                              event={event}
                                              i={i}
                                              clickHandler={clickHandler}
                                              active={active}
                                              rootRef={ref}
                                    >
                                        {formatDate(event.date, EditOptions)}
                                    </LineItem>
                                ))
                            }
                        </ProgressBar>
                    </div>

                </Container>
                <IconButton aria-label="forward" onClick={() =>  moveProgressBar(-1)}>
                    <ArrowForwardIosRounded/>
                </IconButton>
            </Wrapper>
        </>
    );
}

export default Timeline;

type PropsType = {
    active: number,
    setActive: React.Dispatch<React.SetStateAction<[number, number]>>,
    events: ModifiedEvent[]
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

const Container = styled.div`
  width: 65vw;
  height: 15vh;
  overflow-x: hidden;
`

const Scale = styled.div`
  background-color: darkred;
  height: 3px;
  width: 1px;
  position: relative;
  top: 8px;
  margin-left: 50px;
  left: 27px;
`

const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 20vh;
  margin: 0 50px;
`


