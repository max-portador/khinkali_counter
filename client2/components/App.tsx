import React, {FC, useState} from 'react';
import Timeline from "./Timeline";
import ImageGallery from "./ImageGallery";

export const images = Array(6).fill(null)
    .map((_, i) => `/assets/${i + 1}.jpg`)

const App: FC = () => {

    const [[event, direction], setEvent] = useState<[number, number]>([0, 0])

    const paginate = (newDirection: number) => {
        setEvent([event + newDirection, newDirection]);
    }

    return <>
        <Timeline
            active={event}
            setActive={setEvent}
        />
        <ImageGallery
            active={event}
            direction={direction}
            setEvent={setEvent}
            paginate={paginate}
        />
    </>
};

export default App;