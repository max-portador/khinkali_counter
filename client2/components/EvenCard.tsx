import React, {FC} from 'react';
import {IEvent} from "../types/event";
import {Avatar, Button, Card, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {URL} from "../api/baseApi";
import {CardOptions, formatDate} from "../utils/dateHelper";
import {styled} from "@mui/material/styles";

const EvenCard: FC<PropsType> = ({event}) => {
    return (
        <StyledCard >
            <Stack padding={1} justifyContent={'center'}  width={370}>

                <CardHeader
                    title={formatDate(event.date, CardOptions)}
                />
                <CardContent >
                    <Typography variant='h3' noWrap={true}>
                        {event.amount + ' хинкалей'}
                    </Typography>
                </CardContent>
                <Stack direction="row" spacing={1} mt={4} ml={2}>
                    <Button variant="outlined" endIcon={<ModeEditOutlinedIcon /> }>
                        Изменить
                    </Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Удалить
                    </Button>
                </Stack>
            </Stack>
            <Avatar
                src={URL + '/' + event.imageName}
                variant={"rounded"}
                sx={{
                    margin: '30px',
                    height: 300,
                    width: 200,
                }}
            />

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
