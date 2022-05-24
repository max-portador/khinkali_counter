import React, {FC} from 'react';
// import '../styles/App.module.css'
import Timeline from "./Timeline";
import ImageGallery from "./ImageGallery";

export const images = Array(6).fill(null)
    .map((_, i) => `/assets/${i + 1}.jpg`)

const App: FC = () => {
    return <>
        <ImageGallery/>
    </>
};

export default App;