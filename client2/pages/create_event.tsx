import React, {useEffect, useState, DragEvent} from 'react';
import MainLayout from "../layout/MainLayout";
import {Button, FormControl, TextField, Typography} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import styled from "styled-components";
import FileUpload from "../components/FileUpload";
import DropArea from "../components/DropArea";
import {eventsAPI} from "../api/eventsApi";
import {useRouter} from "next/router";

const CreateEvent = () => {
    const router = useRouter()

    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1)
    const [picture, setPicture] = useState<Blob | null>(null)
    const [src, setSrc] = useState<string | null>(null)

    useEffect(() => {
        if (picture) {
            setSrc(URL.createObjectURL(picture))
        } else {
            setSrc(null)
        }
    }, [picture])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value)
        setAmount(val < 1 ? 1 : val)
    }

    const onSubmit = async () => {
        const formData = new FormData()
        formData.append('amount', String(amount))
        formData.append('image', picture)
        formData.append('date', String(eventDate))
        await eventsAPI.create(formData)
        router.push('/')
    }

    const formats = {
        normalDate: "dd.MM.yyyy",
        keyboardDate: "dd.MM.yyyy",
    };

    return (
        <MainLayout>
            <Form style={{border: '1px solid black', borderRadius: 10}}>
                <VContainer>
                    <HContainer style={{gap: 10}}>
                        <TextField
                            id="count"
                            value={amount}
                            type='number'
                            onChange={handleChange}
                            variant="outlined"
                            label="Количество "
                            color="primary"
                        />
                        <FileUpload accept={'image/*'} setFile={setPicture}>
                            <Button variant="outlined" sx={{fontSize: '2vh', lineHeight: '5vh'}}  color='primary'>
                                {
                                    picture
                                        ? <Typography>Изменить изображение</Typography>
                                        : <Typography>Загрузите изображение</Typography>
                                }
                            </Button>
                        </FileUpload>
                        <LocalizationProvider dateAdapter={AdapterDateFns} dateFormats={formats}>
                            <DatePicker
                                label="Дата"
                                value={eventDate}
                                onChange={(newValue) => {
                                    setEventDate(newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                    />}
                            />
                        </LocalizationProvider>
                    </HContainer>
                </VContainer>
                <VContainer>
                    <DropArea src={src} setPicture={setPicture}/>
                </VContainer>
                <HContainer>
                    <SubmitButton disabled={ !picture } onClick={onSubmit}>Отправить</SubmitButton>
                </HContainer>

            </Form>

        </MainLayout>
    );
};

export default CreateEvent;

const Form = styled(FormControl)`
  display: flex;
  width: 60vw;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  padding: 20px;
`

const HContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const VContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`

const SubmitButton = styled((props) => <Button variant={"contained"} {...props}/> )`
  margin-top: 10px;
  
`