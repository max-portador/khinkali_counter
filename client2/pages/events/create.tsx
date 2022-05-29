import React, {useState} from 'react';
import MainLayout from "../../layout/MainLayout";
import {Button, Stack, TextField} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import styled from "styled-components";
import DropArea from "../../components/DropArea";
import {eventsAPI} from "../../api/eventsApi";
import {ImageFileUpload} from "../../components/FileUploaders/image_file_upload";
import {StatusCode} from "../../types/response";
import {Notification} from "../../components/Notification";

const CreateEvent = () => {

    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1)
    const [picture, setPicture] = useState<Blob | null>(null)

    const [alertIsOpen, setAlertIsOpen] = React.useState(false);
    const [status, setStatus] = useState<number | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value)
        setAmount(val < 1 ? 1 : val)
    }

    const onSubmit = async () => {
        const formData = new FormData()
        formData.append('amount', String(amount))
        formData.append('image', picture)
        formData.append('date', String(eventDate))

        let event = await eventsAPI.create(formData)

        setStatus(event ? StatusCode.OK : 500)
        if (event) {
            setPicture(null)
        }

        setAlertIsOpen(true)

    }

    const formats = {
        normalDate: "dd.MM.yyyy",
        keyboardDate: "dd.MM.yyyy",
    };

    return (
        <MainLayout>
            <Form direction={"column"} spacing={2}>
                    <CenteredStack direction={'row'} spacing={3}>
                        <TextField
                            value={amount}
                            type='number'
                            onChange={handleChange}
                            variant="outlined"
                            label="Количество хинкалей"
                            color="primary"
                        />
                        <ImageFileUpload picture={picture} setPicture={setPicture}/>
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
                    </CenteredStack>
                <DropArea picture={picture} setPicture={setPicture}/>
                <SubmitButton disabled={!picture} onClick={onSubmit}>Отправить</SubmitButton>
                <Notification status={status} alertIsOpen={alertIsOpen} setAlertIsOpen={setAlertIsOpen}/>
            </Form>
        </MainLayout>
    );
};

export default CreateEvent;

const Form = styled(Stack)`
  width: 60vw;
  padding: 20px;
  border: 1px solid steelblue;
  border-radius: 10px;
  
`

export const CenteredStack = styled(Stack)`
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  
`

const SubmitButton = styled((props) => <Button variant={"contained"} {...props}/>)`
  width: 30%;
  align-self: center;

`


