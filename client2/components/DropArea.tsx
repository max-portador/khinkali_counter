import React, {DragEvent, FC} from 'react';
import styled from "styled-components";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Typography} from "@mui/material";


const DropArea: FC<PropsType> = ({setPicture, src}) => {

    const dragHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const dropHandler = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const files = event.dataTransfer.files

        if (files?.length) {
            let file = files[0]
            if (file.type.match('image/*')) {
                setPicture(files[0])
            }
        }
    }

    return (
        <Container
            onDragEnter={dragHandler}
            onDragLeave={dragHandler}
            onDragOver={dragHandler}
            onDrop={dropHandler}
        >

            {
                src ? <>
                        <UploadedImg src={src} className='galleryImage'/>
                        <img src={src} alt={'photo here'} className='galleryImage'/>
                    </>
                    : <Typography>Перетащите изображения сюда</Typography>
            }
            <Clear onClick={() => setPicture(null)}/>
        </Container>

    );
};

export default DropArea;


type PropsType = {
    src: string,
    setPicture: React.Dispatch<React.SetStateAction<Blob | MediaSource>>
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;
  object-fit: scale-down;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px dashed #1976d2;
  color: gray;

  &:hover {
    color: steelblue;
    border: 1px solid #1976d2;
  }

`

const UploadedImg = styled.img`
  position: absolute;
  width: 98%;
  height: 98%;
  object-fit: fill;
  filter: blur(10px);
`

const Clear = styled((props) => <HighlightOffIcon {...props} fontSize='large' color='error'/>)`
    position: absolute;
    top: 10px;
    right: 10px;
`