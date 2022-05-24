import React, {FC} from 'react';
import {AppProps} from 'next/app';
import '../styles/global.css'
// import '../styles/Transition.css'

// This default export is required in a new `pages/_app.js` file.
const MyApp: FC<AppProps> = ({Component, pageProps}) => <Component {...pageProps}/>

export default MyApp