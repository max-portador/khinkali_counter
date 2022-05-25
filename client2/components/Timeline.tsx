import React, {FC, useState} from 'react';
import cn from 'classnames';
import css from '../styles/Timeline.module.css';
import { IconButton} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {ArrowForwardIosRounded} from "@mui/icons-material";

const steps = [60, 20, 120, 100, 25, 0]
    .map((step, i) => ({
        label: `Step ${i + 1}`,
        dist: step
    }))

const getTotalDist = (curr: number) => {
    return steps.reduce((acc, step, i) => {
        if (i < curr) {
            return acc + step.dist + (i ? 60 : 30)
        } else {
            return acc
        }
    }, 5)
}

const Timeline: FC<PropsType> = ({active, setActive}) => {

    const clickHandler = function (index: number) {
        setActive(([prev, direction]) => {
            const newDirection = prev - index > 0 ? -1000 : 1000
            return [index, newDirection]
        })
    }

    return (
        <>
            <h2>{getTotalDist(active)}</h2>
            <div className={css.wrapper}>
                <IconButton aria-label="back">
                  <ArrowBackIosRoundedIcon/>
                </IconButton>
                <div className={css.container}>
                    <div className={css.scale}
                         style={{
                             width: getTotalDist(active),
                             transition: 'width .3s linear'
                         }}
                    />
                    <ul className={css.progressbar}>
                        {
                            steps.map((step, i) => (
                                <li key={step.label}
                                    className={cn({ [css.active]: i === active,
                                        [css.preactive]: i < active }) }
                                    style={{
                                        marginRight: i === steps.length - 1 ? 20 : step.dist
                                    }}
                                    onClick={() => clickHandler(i)} >
                                    {step.label}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <IconButton aria-label="forward" >
                    <ArrowForwardIosRounded />
                </IconButton>
            </div>
        </>
    );
}

export default Timeline;

type PropsType = {
    active: number,
    setActive:  React.Dispatch<React.SetStateAction<[number, number]>>,
}