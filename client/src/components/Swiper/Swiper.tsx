import React, {FC, useEffect, useState} from 'react';
import css from './Swiper.module.css'
import ButtonBackward from "./ButtonBackward";
import ButtonForeward from "./ButtonForeward";


const IMG_WIDTH = 700;
const IMG_HEIGHT = 500;
const images = Array(6).fill(null)
    .map((_, i) => String(require(`../../assets/${i + 1}.jpg`)))


const Swiper: FC = () => {
    const [imgs, setImgs] = useState(() => images)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [movement, setMovement] = useState<number>(0)

    const getMaxMovement = () => (imgs.length - 1) * IMG_WIDTH

    useEffect(() => {
        setMovement(currentIndex * IMG_WIDTH)
    }, [currentIndex])

    return (
        <div className={css.main}
             style={ {
                 width: IMG_WIDTH,
                 height: IMG_HEIGHT
             }}
        >
            <div className={css.swiper}
                 style={{
                     transform: `translateX(${movement * -1}px)`,
                     transitionDuration: `0.5s`
                 }}
            >
                {
                    imgs
                        .map(src =>
                            <div className={css.event_container}
                                 style={{width: IMG_WIDTH, height: IMG_HEIGHT}}>
                                <img key={src}
                                     src={src}
                                     alt={'photo'}
                                />
                            </div>)

                }
            </div>

            {
                movement !== 0 && <ButtonBackward clickHandler={setCurrentIndex}/>
            }
            {
                movement !== getMaxMovement() && <ButtonForeward clickHandler={setCurrentIndex}/>
            }
        </div>)

};

export default Swiper;