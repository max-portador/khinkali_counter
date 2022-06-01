import React, {ChangeEvent, FC} from 'react';
import {Field, Form, Formik} from "formik";
import {URL} from "../api/baseApi";
import {Button, Dialog, Grid, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DropArea from "./DropArea";
import {StyledCard} from "./common/styled";
import {IEvent} from "../types/event";

const EditDialog:FC<PropsType> = ({event, isOpen, setIsOpen}) => {

    const formats = {
        normalDate: "dd.MM.yyyy",
        keyboardDate: "dd.MM.yyyy",
    };

    const submitHandler = async (values) => {
        console.table(values)
        setIsOpen(false)
    }
    return (
        <Dialog maxWidth='xl' open={isOpen} onClose={() => setIsOpen(false)}>
            <Formik initialValues={{
                date: event.date,
                amount: event.amount,
                image: `${URL}/${event.imageName}`,
            }}
                    onSubmit={submitHandler}
            >
                {({values, setFieldValue}) => (
                    <Form>
                        <StyledCard>
                            <Stack padding={1} justifyContent={'center'} width={600}>
                                <Grid container height={80}
                                      justifyContent={'center'}
                                      alignItems={'center'} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}
                                                          dateFormats={formats}>
                                        <Field name='date' id='date'
                                               label='Дата'
                                               min={1}
                                               component={DatePicker}
                                               onChange={(val) => {
                                                   setFieldValue('date', val)
                                               }}

                                               renderInput={(params) => <TextField
                                                   variant="filled" {...params}/>}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid container height={80}
                                      justifyContent={'center'}
                                      alignItems={'center'}
                                >
                                    <Field name='amount' id='amount'
                                           label='Количество хинкалей'
                                           component={TextField}
                                           noWrap={true}
                                           variant="filled"
                                           sx={{width: 227}}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               let val = Number(e.target.value)
                                               setFieldValue('amount', val < 1 ? 1 : val)
                                           }}
                                           value={values.amount}
                                           type={'number'}

                                    />
                                </Grid>
                                <Stack direction="row" spacing={1} mt={4} ml={2} justifyContent={'center'}>
                                    <Button variant="outlined" type='submit' endIcon={<SaveIcon/>}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button variant="outlined" color={'error'} startIcon={<CancelIcon/>}
                                            onClick={() => {
                                                setIsOpen(false)
                                            }}
                                    >
                                        Отмена
                                    </Button>
                                </Stack>
                            </Stack>
                            <Grid container mt={2} mb={2}>
                                <Field picture={values.image}
                                       id='image' name='image'
                                       text='Кликните на зону или перетащите изображение сюда'
                                       minHeight='300px'
                                       component={DropArea}
                                       setPicture={(file: Blob) => {
                                           setFieldValue('image', file)
                                       }}/>
                            </Grid>
                        </StyledCard>
                    </Form>
                )
                }
            </Formik>
        </Dialog>
    );
};

export default EditDialog;

type PropsType = {
    isOpen: boolean,
    setIsOpen: Function,
    event: IEvent,
}