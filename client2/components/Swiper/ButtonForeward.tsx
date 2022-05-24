import React, {FC} from 'react';
import css from '../../styles/Swiper.module.css'
import {DirectionType} from "./FadingSwiper";

const ButtonForeward: FC<PropsType> = ({clear, clickHandler, directionHandler}) => {
    return (
        <button
            className={`${css.next} ${css.move}`}
            onClick={() => {
                clickHandler((actual) => actual + 1);
                directionHandler('left')
                clear()
            }}
        >
            →
        </button>
    );
};

export default ButtonForeward;

type PropsType = {
    clickHandler:  React.Dispatch<React.SetStateAction<number>>
    directionHandler:  React.Dispatch<React.SetStateAction<DirectionType>>
    clear: Function
}