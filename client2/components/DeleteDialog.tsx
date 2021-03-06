import React, {FC} from 'react';
import {Dialog, Grid, Typography} from "@mui/material";
import {IEvent} from "../types/event";
import {CancelCornerIcon, DeleteButton} from "./common/styled";
import {useActions} from "../hooks/useActions";

const DeleteDialog: FC<PropsType> = ({event, isOpen, setIsOpen}) => {
    const {deleteEvent} = useActions()

    const closeDialog = () => {
        setIsOpen(false);
    };

    const removeEvent = () => {
        deleteEvent(event._id);
        closeDialog();
    }

    return (
        <div>
            <Dialog maxWidth='lg' open={isOpen} onClose={() => setIsOpen(false)}>
                <Grid container p={2}
                      gap={2}
                      width={'100%'}
                      direction={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                >
                    <Grid container gap={1} justifyContent={"space-between"} justifyItems={'center'}>
                        <Typography>Вы действительно хотите удалить событие?</Typography>
                        <CancelCornerIcon onClick={closeDialog}/>
                    </Grid>
                    <DeleteButton onClick={removeEvent}>
                        Удалить
                    </DeleteButton>
                </Grid>
            </Dialog>
        </div>
    );
};

export default DeleteDialog;

type PropsType = {
    isOpen: boolean,
    setIsOpen: Function,
    event: IEvent,
}
