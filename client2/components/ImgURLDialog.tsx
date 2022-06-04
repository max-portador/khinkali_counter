import React, {ChangeEvent, FC, useState} from 'react';
import {Dialog, Grid, TextField, Typography} from "@mui/material";
import {CancelCornerIcon, SaveButton} from "./common/styled";

const ImgUrlDialog:FC<PropsType> = ({isOpen, setIsOpen, setFile}) => {
    const [URL, setURL] = useState(null)
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setURL(e.currentTarget.value)
    }

    const clickHandler = () => {
        setFile(URL)
        setURL('')
        setIsOpen(false)
    }

    return (
        <Dialog maxWidth={'xl'} open={isOpen} onClose={() => setIsOpen(false)}>
            <Grid container p={2}
                  gap={2}
                  width={600}
                  direction={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
            >
                <Grid container gap={1} justifyContent={"space-between"} justifyItems={'center'}>
                    <Typography>Вставьте ссылку на картинку </Typography>
                    <CancelCornerIcon onClick={() => setIsOpen(false)}/>
                </Grid>
                <TextField
                fullWidth
                variant={'outlined'}
                value={URL}
                onChange={changeHandler}
                />
                <SaveButton onClick={clickHandler} disabled={!URL}>
                    Сохранить
                </SaveButton>
            </Grid>
        </Dialog>
    );
};

export default ImgUrlDialog;

type PropsType = {
    isOpen: boolean,
    setIsOpen: Function,
    setFile: Function
}