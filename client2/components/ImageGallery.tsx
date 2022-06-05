import React, {FC} from 'react';
import styled from "styled-components";
import {wrap} from "popmotion";
import {images} from "./HomePage";
import {AnimatePresence, motion} from "framer-motion";

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

    return (<Container className='example-container'>
            <AnimatePresence initial={false} custom={direction}>
                <GalleryImage
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
                />
            </AnimatePresence>

            {active < images.length - 1 &&
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