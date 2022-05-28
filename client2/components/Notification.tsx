import React, {FC, useEffect, useState} from "react";
import {StatusCode} from "../types/response";
import {Alert, Snackbar} from "@mui/material";


export const Notification: FC<NotificationProps> = ({alertIsOpen, setAlertIsOpen, status}) => {
    const [alertProps, setAlertProps]
        = useState<AlertPropsType>({severity: AlertSeverity.SUCSESS, message: AlertMessage.SUCSESS})

    useEffect(() => {
        if (status === StatusCode.OK) {
            setAlertProps({
                severity: AlertSeverity.SUCSESS,
                message: AlertMessage.SUCSESS
            })
        } else {
            setAlertProps({
                severity: AlertSeverity.ERROR,
                message: AlertMessage.ERROR
            })
        }
    }, [status])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertIsOpen(false);
    };

    return <Snackbar open={alertIsOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertProps.severity} sx={{width: '100%'}}>
            {alertProps.message}
        </Alert>
    </Snackbar>
}
type NotificationProps = {
    alertIsOpen: boolean,
    setAlertIsOpen: Function,
    status: number
}


type AlertPropsType = {
    severity: AlertSeverity
    message: AlertMessage
}

enum AlertSeverity {
    'SUCSESS' = "success",
    "ERROR" = "error"
}

enum AlertMessage {
    'SUCSESS' = "Событие успешно сохранено",
    "ERROR" = "Произошла ошибка во время сохранения события"
}