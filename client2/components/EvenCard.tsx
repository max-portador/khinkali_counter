import React, {FC, useState} from 'react';
import {IEvent} from "../types/event";
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Stack, Typography} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {URL} from "../api/baseApi";
import {CardOptions, formatDate} from "../utils/dateHelper";
import styled from "styled-components";
import StyledDatePicker from "./StyledDatePicker";
import Box from "@mui/material/Box";

const EvenCard: FC<PropsType> = ({event}) => {

    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [eventDate, setEventDate] = useState<Date>(new Date(event.date))

    return (
        <StyledCard>
            <Stack padding={1} justifyContent={'center'} width={370}>
                {
                    isEditMode
                        ?
                        <>
                            <Box pl={2} >
                                <StyledDatePicker
                                    eventDate={eventDate}
                                    setEventDate={setEventDate}
                                    sx={{'width': '80%'}}
                                />
                            </Box>

                            <CardContent>
                                <Typography variant='h3' noWrap={true}>
                                    {event.amount + ' хинкалей'}
                                </Typography>
                            </CardContent>
                            <Stack direction="row" spacing={1} mt={4} ml={2}>
                                <Button variant="outlined" endIcon={<SaveIcon/>}
                                        onClick={() => { setEditMode(false) }}
                                >
                                    Сохранить
                                </Button>
                                <Button variant="outlined" startIcon={<CancelIcon/>}
                                        onClick={() => { setEditMode(false) }}
                                >
                                    Отмена
                                </Button>
                            </Stack>
                        </>

                        : <>
                            <Grid container pl={2} height={40} justifyContent={'start'}>
                                <Typography variant={'h4'}>
                                    { formatDate(event.date, CardOptions) }
                                </Typography>
                            </Grid>
                            <CardContent>
                                <Typography variant='h3' noWrap={true}>
                                    {event.amount + ' хинкалей'}
                                </Typography>
                            </CardContent>

                            <Stack direction="row" spacing={1} mt={4} ml={2}>

                                <Button variant="outlined"
                                        endIcon={<ModeEditOutlinedIcon/>}
                                        onClick={() => { setEditMode(true) }}
                                >
                                    Изменить
                                </Button>

                                <Button variant="outlined" startIcon={<DeleteIcon/>}>
                                    Удалить
                                </Button>

                            </Stack>
                        </>
                }
            </Stack>

            <StyledImage src={`${URL}/${event.imageName}`}/>
        </StyledCard>
    );
};

export default EvenCard;

type PropsType = {
    event: IEvent
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding: 5px 20px;
  border: 0.5px solid lightgray;
  background-color: #b8c6db;
  width: min-content;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
`
const StyledImage = styled((props) => <Avatar {...props} variant={"rounded"}/>)`
  margin: 30px;
  height: 300px;
  width: 200px;
`