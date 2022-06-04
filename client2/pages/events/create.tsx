import React, {useState} from 'react';
import MainLayout from "../../layout/MainLayout";
import {Button, Stack, TextField} from "@mui/material";
import styled from "styled-components";
import DropArea from "../../components/DropArea";
import {eventsAPI} from "../../api/eventsApi";
import {StatusCode} from "../../types/response";
import {Notification} from "../../components/Notification";
import StyledDatePicker from "../../components/StyledDatePicker";
import ImgUrlDialog from "../../components/ImgURLDialog";

const CreateEvent = () => {

    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1)
    const [picture, setPicture] = useState<Blob | null>(null)

    const [alertIsOpen, setAlertIsOpen] = React.useState(false);
    const [isOpenURL, setIsOpenURL] = React.useState(false);
    const [status, setStatus] = useState<number | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value)
        setAmount(val < 1 ? 1 : val)
    }

    const createFormData = async (): Promise<FormData> => {
        const formData = new FormData()
        formData.append('amount', String(amount))
        formData.append('date', String(eventDate))

        if (typeof picture === "string"){
            const params = new Proxy(new URLSearchParams(picture), {
                get: (searchParams, prop: string) => searchParams.get(prop),
            });
            let format = params['format'] || 'jpg';
            let blobFile = await fetch(picture).then(r => r.blob())
            let file = new File([blobFile], `1.${format}`, { type: `image/${formData}` })
            formData.append('image', file)
        }
        else {
            formData.append('image', picture)
        }

        return formData;
    };

    const onSubmit = async () => {
        const formData = await createFormData();

        let event = await eventsAPI.create(formData)

        setStatus(event ? StatusCode.OK : 500)
        if (event) {
            setPicture(null)
        }
        setAlertIsOpen(true)
    }

    return (
        <MainLayout>
            <Form direction={"column"} spacing={2}>
                    <CenteredStack direction={'row'} spacing={3}>
                        <ImgUrlDialog isOpen={isOpenURL} setIsOpen={setIsOpenURL} setFile={setPicture}/>
                        <TextField
                            value={amount}
                            type='number'
                            onChange={handleChange}
                            variant="outlined"
                            label="Количество хинкалей"
                            color="primary"
                        />
                        {/*<ImageFileUpload picture={picture} setPicture={setPicture}/>*/}

                        <Button variant={'outlined'} onClick={()=> setIsOpenURL(true)}>
                            Загрузить изображение по ссылке
                        </Button>
                        <StyledDatePicker eventDate={eventDate} setEventDate={setEventDate}/>
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


