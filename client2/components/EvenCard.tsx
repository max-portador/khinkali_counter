import React, {FC, useState} from 'react';
import {IEvent} from "../types/event";
import {Button, Grid, Stack, Typography} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {URL} from "../api/baseApi";
import {CardOptions, formatDate} from "../utils/dateHelper";
import {StyledCard, StyledImage} from "./common/styled";
import EditDialog from "./EditDialog";


const EvenCard: FC<PropsType> = ({event}) => {

    const [isEditMode, setEditMode] = useState<boolean>(false)

    return (
        <>
            <EditDialog event={event} isOpen={isEditMode} setIsOpen={setEditMode}/>
            <StyledCard>
                <Stack padding={1} justifyContent={'center'} width={370}>
                    <Grid container pl={2} height={80} justifyContent={'center'}>
                        <Typography variant={'h4'} sx={{display: 'flex', alignItems: 'center'}}>
                            {formatDate(event.date, CardOptions)}
                        </Typography>
                    </Grid>
                    <Grid container pl={2} height={80} justifyContent={'center'}>
                        <Typography variant='h3' noWrap={true}>
                            {event.amount + ' хинкалей'}
                        </Typography>
                    </Grid>
                    <Stack direction="row" spacing={1} mt={4} ml={2} justifyContent={'center'}>

                        <Button variant="outlined"
                                endIcon={<ModeEditOutlinedIcon/>}
                                onClick={() => {
                                    setEditMode(true)
                                }}
                        >
                            Изменить
                        </Button>

                        <Button variant="outlined" color={'error'} startIcon={<DeleteIcon/>}>
                            Удалить
                        </Button>

                    </Stack>
                </Stack>
                <StyledImage src={`${URL}/${event.imageName}`}/>
            </StyledCard>
        </>
    );
};

export default EvenCard;





type PropsType = {
    event: IEvent
}
