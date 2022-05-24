import css from '../../styles/Swiper.module.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import cn from 'classnames'
import React from "react";

const IMG_WIDTH = 700;
const IMG_HEIGHT = 500;


const ImageCard = ({active, direction, images}) => {

    const childFactory = (direction) => (child) =>
        React.cloneElement(child, {classNames: direction, timeout: 1000})

    return <>
        {
            images.map((image, i) => {
                    return <CSSTransition
                        in={i === active}
                        key={image}
                        timeout={1000}
                        classNames={'pageSlider'}
                    >
                        <div className={
                            cn(direction, css.event_container,
                                {'pageSlider-enter': i === active})
                        }
                             style={{width: IMG_WIDTH, height: IMG_HEIGHT}}>
                            <img
                                src={image}
                                className={css.swipable_img}
                                alt={'photo'}
                            />
                        </div>

                    </CSSTransition>
                }
            )
        }
    </>
}

export default ImageCard