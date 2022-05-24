import React, {FC} from 'react';
import css from '../../styles/Swiper.module.css'
import { DirectionType } from './FadingSwiper';

const ButtonBackward: FC<PropsType> = ({clear, clickHandler, directionHandler}) => {
    return (
        <button
            className={`${css.back} ${css.move}`}
            onClick={() => {
                clickHandler((actual) => actual - 1);
                directionHandler('right')
                clear()
            }}
        >
            ←
        </button>
    );
};

export default ButtonBackward;

type PropsType = {
    clickHandler:  React.Dispatch<React.SetStateAction<number>>
    directionHandler:  React.Dispatch<React.SetStateAction<DirectionType>>
    clear: Function
}