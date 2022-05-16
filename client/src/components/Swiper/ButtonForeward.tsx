import React, {FC} from 'react';
import css from './Swiper.module.css'

const ButtonForeward: FC<PropsType> = ({clickHandler}) => {
    return (
        <button
            className={`${css.next} ${css.move}`}
            onClick={() => {
                clickHandler((actual) => actual + 1);
            }}
        >
            →
        </button>
    );
};

export default ButtonForeward;

type PropsType = {
    clickHandler:  React.Dispatch<React.SetStateAction<number>>
}