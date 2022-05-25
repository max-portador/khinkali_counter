import Head from "next/head";
import css from '../styles/MainLayout.module.css'
import {Container} from "@mui/material";
import React from "react";
import styled from "styled-components";

const MainContainer = styled(Container)`

`


const MainLayout: React.FC<Props> = ({title, description, keywords, children}) => {
    return (
        <>
            <Head>
                <title>{ title || 'Khinkali Counter' }</title>
                <meta
                    name='description'
                    content={['Khinkali Counter, ReactJS', description || ''].join(' ') }/>
                <meta
                    name='robots'
                    content='index, follow'/>
                <meta
                    name='keywords'
                    content={keywords || '' + 'Khinkali, Georgia'}/>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'/>
            </Head>
            <Container className={css.container} >
                {children}
            </Container>
        </>
    );
};

export default MainLayout;




type Props = {
    children?: React.ReactNode,
    title?: string,
    description?: string,
    keywords?: string,

}