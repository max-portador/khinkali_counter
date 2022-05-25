import React, {useEffect, useState, DragEvent} from 'react';
import MainLayout from "../layout/MainLayout";
import {Button, FormControl, TextField} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import styled from "styled-components";
import FileUpload from "../components/FileUpload";

const Form = styled(FormControl)`
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`

const DropArea = styled.div` 
  position: relative;
  width: 30vw;
  height: 50vh;
  object-fit: scale-down;
  background: rgba(169, 169, 169, 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
`

const HContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`

const VContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
`

const CreateEvent = () => {
    const [value, setValue] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1)
    const [picture, setPicture] = useState<Blob | MediaSource | null>(null)
    const [src, setSrc] = useState<string | null>(null)
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        if (picture) {
            setSrc(URL.createObjectURL(picture))
        }

    }, [picture])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value)
        setAmount(val < 1 ? 1 : val)
    }

    const dragEnterHandler = (event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const files = event.dataTransfer.files

        if (files?.length){
            setPicture(files[0])
        }

        setDragEnter(false)
    }

    const formats = {
        normalDate: "dd.MM.yyyy",
        keyboardDate: "dd.MM.yyyy",
    };

    return (
        <MainLayout>
            <HContainer style={{border: '1px solid black', borderRadius: 10}}>
                <VContainer>
                    <Form>
                        <TextField
                            id="count"
                            value={amount}
                            type='number'
                            onChange={handleChange}
                            variant="outlined"
                            label="Количество хинкалей"
                            color="success"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} color="success" dateFormats={formats}>

                            <DatePicker

                                label="Дата"

                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}
                                                                    color="success"
                                />}
                            />
                        </LocalizationProvider>
                    </Form>
                    <FileUpload accept={'image/*'} setFile={setPicture} >
                        <Button variant="outlined" color='success'>Загрузите файл</Button>
                    </FileUpload>
                </VContainer>
                <DropArea
                    onDragEnter={dragEnterHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragEnterHandler}
                    onDrop={dropHandler}
                >
                    {
                        src ? <img id='photo' src={src} alt={'photo here'} className='galleryImage'/>
                            : <div>Перетащите файлы сюда</div>
                    }
                </DropArea>
            </HContainer>





        </MainLayout>
    );
};

export default CreateEvent;