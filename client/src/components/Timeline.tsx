import React, {FC, useState} from "react";

// @ts-ignore
import HorizontalTimeline from 'react-horizontal-timeline';
import css from "./Swiper/Swiper.module.css";
import Swiper from "./Swiper/Swiper";

/*
Format: YYYY-MM-DD
Note: Make sure dates are sorted in increasing order
*/

const IMG_WIDTH = 650;
const IMG_HEIGHT = 300;

const VALUES = [
    '2008-06-01',
    '2010-06-01',
    '2013-06-01',
    '2015-03-01',
    '2019-01-01',
    '2019-06-17',
];

const images = Array(6).fill(null)
    .map((_, i) => String(require(`../assets/${i + 1}.jpg`)))
    .map(src =>
        <div style={{
            alignContent: "center",
            justifyContent: "center",
            display: 'flex',
            width: 600,
            height: 600
        }}>
            <img key={src}
                 src={src}
                 alt={'photo'}
            />
        </div>)

const Timeline: FC = () => {
    let [value, setValue] = useState<number>(() => 0)
    let [previous, setPrevious] = useState<number>(() => 0)

    return (
        <div>
            {/* Bounding box for the Timeline */}
            <div style={{ width: '60vw', height: '100px', margin: '0 auto' }}>

                <HorizontalTimeline
                    index={value}
                    indexClick={(index: number) => {
                        setPrevious(value)
                        setValue(index);
                    }}

                    values={ VALUES } />
            </div>

                    <div className={'text-center'} style={{
                        display: 'flex',
                        alignContent: "center",
                        justifyContent: "center",
                    }}>
                        { images[value] }
                     </div>
                {/*<Swiper index={value}/>*/}
        </div>
    );
};

export default Timeline;


