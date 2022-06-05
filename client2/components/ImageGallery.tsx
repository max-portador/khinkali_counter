import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {wrap} from "popmotion";
import {AnimatePresence, motion} from "framer-motion";
import {ModifiedEvent} from "../types/event";
import {serverURL} from "../api/baseApi";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }
    },

    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },

    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        }
    }
}

const ImageGallery:FC<PropsType> = ({active, direction, paginate, events, setEvent}) => {

    const imageIndex = wrap(0, events.length, active)
    useEffect(() => {
        if (events.length)
        console.log(URL + '/' + events[imageIndex].imageName )
    }, [])

    return (<Container className='example-container'>
            <AnimatePresence initial={false} custom={direction}>
                <GalleryImage
                    key={active}
                    src={serverURL + '/' + events[imageIndex].imageName}
                    // src={'http://localhost:5555/9a3c92e5-4b21-4a2c-8060-11b562867de6.png'}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                        x: {type: 'spring', stiffness: 300, damping: 30},
                        opacity: {duration: 0.2}
                    }}
                />
            </AnimatePresence>

            {active < events.length - 1 &&
                <button className="next"
                        onClick={() => paginate(1)}>
                {"‣"}
            </button>}

            {active > 0 &&
                <button className="prev"
                     onClick={() => paginate(-1)}>
                    {"‣"}
                </button>
            }
        </Container>

)
    ;
};

export default ImageGallery;

type PropsType = {
    active: number,
    direction: number,
    events: ModifiedEvent[],
    setEvent:  React.Dispatch<React.SetStateAction<[number, number]>>,
    paginate: (newDirection: number) => void
}

const Container = styled.div`
  height: calc(100vh - 90px - 120px);;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GalleryImage = styled(motion.img)`
  position: absolute;
  object-fit: scale-down;
  width: 50%;
  height: 100%;
  padding-bottom: 12px;
`