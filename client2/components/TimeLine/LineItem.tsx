import styled from "styled-components";
import {Stack} from "@mui/material";
import React, {FC, useEffect} from "react";
import Box from "@mui/material/Box";
import {ModifiedEvent} from "../../types/event";
import {useInView} from "react-intersection-observer";


export const LineItem: FC<OuterPropsType> = ({children, clickHandler, total, event, i, active, rootRef}) => {

    const [ref, inView] = useInView({
        threshold: 1,
        // root: rootRef.current
    });

    useEffect(() => {
        if (inView) {
            console.log('In view ' + i)
        }
    }, [inView])

    return <StyledListItem event={event} i={i}
                           active={active} total={total}
                           clickHandler={clickHandler}
    >
        {
            inView && (<span>iwogberkbnenrkr</span>)
        }
        <Circle ref={ref} i={i} active={active}/>
        <Label i={i} active={active}>
            {children}
        </Label>

    </StyledListItem>
}

const COLOR_ACTIVE = 'darkred'
const COLOR_NORMAL = 'black'

const StyledListItem = styled((props: ItemPropsType) => {
    const {clickHandler, i} = props
    return <Stack direction={'column'} {...props} onClick={() => clickHandler(i)}/>
})`
  margin-right: ${(props => props.i === props.total - 1
          ? 20
          : 20 * props.event.daysToNext + 'px')};
  padding-left: ${(props => props.i === 0 ? '20px' : 0)};
  z-index: 1;
`
const Circle = styled((props: InnerCircleProps) => <Box {...props}/>)`
  width: 14px;
  height: 14px;
  display: block;
  margin-bottom: 5px;
  border-radius: 50%;
  background-color: ${props => props.i === props.active ? COLOR_ACTIVE : 'white'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.i < props.active ? COLOR_ACTIVE : COLOR_NORMAL};
  color: ${props => props.i < props.active ? COLOR_ACTIVE : COLOR_NORMAL};
`
const Label = styled((props: InnerProps) => <Box {...props}/>)`
  float: left;
  width: 20px;
  text-align: center;
  margin-left: -50px;
  margin-top: 45px;
  transform: rotate(-45deg);
  color: ${props => props.i === props.active ? COLOR_ACTIVE : COLOR_NORMAL};
`

type OuterPropsType = {
    total: number
    event: ModifiedEvent,
    active: number,
    i: number,
    clickHandler: Function,
    children?: React.ReactNode,
    rootRef: React.MutableRefObject<HTMLDivElement>,
}


type ItemPropsType = {
    total: number
    event: ModifiedEvent,
    active: number,
    i: number,
    clickHandler: Function,
    children?: React.ReactNode,
}

type InnerCircleProps = {
    i: number,
    active: number,
    children?: React.ReactNode,
    ref: (node?: Element) => void
}


type InnerProps = {
    i: number,
    active: number,
    children?: React.ReactNode,
}