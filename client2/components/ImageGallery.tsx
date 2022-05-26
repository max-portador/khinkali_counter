import React, {useState} from 'react';
import styled from "styled-components";
import {wrap} from "popmotion";
import {images} from "./App";
import {AnimatePresence, motion} from "framer-motion";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  aligh-items: center
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

const ImageGallery = () => {

    const [[image, direction], setPage] = useState<[number, number]>([0, 0])

    const imageIndex = wrap(0, images.length, image)

    const paginate = (newDirection: number) => {
        setPage([image + newDirection, newDirection]);
    }


    return (<div className="example-container">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={image}
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
                    style={{objectFit: 'cover', width: '90%', height:'90%'}}
                />
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
    </div>


)
    ;
};

export default ImageGallery;