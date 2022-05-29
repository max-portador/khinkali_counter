import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";


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
            <Navbar/>
            <MainContainer>
                {children}
            </MainContainer>
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 240px;
`
