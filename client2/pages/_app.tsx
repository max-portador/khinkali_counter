import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../store'
import { CookiesProvider } from "react-cookie";
import '../styles/global.css'


const WrappedApp: FC<AppProps> = ({Component, pageProps}) =>(
    <CookiesProvider>
        <Component {...pageProps}/>
    </CookiesProvider>
)

export default wrapper.withRedux(WrappedApp)