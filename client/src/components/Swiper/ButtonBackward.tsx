import React, {FC} from 'react';
import css from './Swiper.module.css'

const ButtonBackward: FC<PropsType> = ({clickHandler}) => {
    return (
        <button
            className={`${css.back} ${css.move}`}
            onClick={() => {
                clickHandler((actual) => actual - 1);
            }}
        >
            ←
        </button>
    );
};

export default ButtonBackward;

type PropsType = {
    clickHandler:  React.Dispatch<React.SetStateAction<number>>
}