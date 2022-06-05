import styled from "styled-components";
import {Stack} from "@mui/material";
import React, {FC} from "react";
import Box from "@mui/material/Box";
import {ModifiedEvent} from "../../types/event";

export const LineItem: FC<ItemPropsType> = (props) => {
    const {children, i, active} = props
    let innerProps = {i, active}
    return <StyledListItem {...props} >
        <Circle {...innerProps}/>
        <Label {...innerProps}>
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
const Circle = styled((props: InnerProps) => <Box {...props}/>)`
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
  transform: rotate(-45deg) ;
  color: ${props => props.i === props.active ? COLOR_ACTIVE : COLOR_NORMAL};
`
type ItemPropsType = {
    total: number
    event: ModifiedEvent,
    active: number,
    i: number,
    clickHandler: Function,
    children?: React.ReactNode,
}
type InnerProps = {
    i: number,
    active: number,
    children?: React.ReactNode,
}