import React, {FC} from 'react';
import styled from "styled-components";
import {wrap} from "popmotion";
import {images} from "./HomePage";
import {AnimatePresence, motion} from "framer-motion";

const Container = styled.div`
  width: 90vw;
  height: 50vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GalleryImage = styled(motion.img)`
  position: absolute;
  max-width: 100vw;
  object-fit: scale-down;
  width: 90%;
  height: 90%
`

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

const ImageGallery:FC<PropsType> = ({active, direction, paginate, setEvent}) => {

    const imageIndex = wrap(0, images.length, active)

    return (<div className='example-container'>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={active}
                    src={images[imageIndex]}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                        x: {type: 'spring', stiffness: 300, damping: 30},
                        opacity: {duration: 0.2}
                    }}
                    className='galleryImage'
                />
            </AnimatePresence>

            {active < images.length - 1 &&
                <div className="next"
                        onClick={() => paginate(1)}>
                {"‣"}
            </div>}

            {active > 0 &&
                <div className="prev"
                     onClick={() => paginate(-1)}>
                    {"‣"}
                </div>
            }

        </div>


)
    ;
};

export default ImageGallery;

type PropsType = {
    active: number,
    direction: number,
    setEvent:  React.Dispatch<React.SetStateAction<[number, number]>>,
    paginate: (newDirection: number) => void
}