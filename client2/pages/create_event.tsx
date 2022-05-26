import React from 'react';
import MainLayout from "../layout/MainLayout";
import {FilledInput, FormControl, FormHelperText, Input, InputLabel, TextField} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateEvent = () => {
    const [value, setValue] = React.useState<Date | null>(null);

    return (
        <MainLayout>
            <FormControl style={{ width: 600}}>
                <InputLabel htmlFor="count">Введите количество хинкалей</InputLabel>
                <FilledInput id='count' fullWidth={true} type='number'/>

                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker

                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} style={{marginTop: 20}}/>}
                    />
                </LocalizationProvider>

            </FormControl>

        </MainLayout>
    );
};

export default CreateEvent;