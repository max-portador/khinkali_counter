import React, {FC, useEffect, useState} from "react";
import {StatusCode} from "../types/response";
import {Alert, Slide, SlideProps, Snackbar} from "@mui/material";
import styled from "styled-components";


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

    return <>
        <Snackbar anchorOrigin={{vertical:'top', horizontal: 'right'}}
                  TransitionComponent={TransitionUp}
                  open={alertIsOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}>
            <StyledAlert onClose={handleClose} severity={alertProps.severity} >
                {alertProps.message}
            </StyledAlert>
        </Snackbar>
    </>
}


const StyledAlert = styled((props) => <Alert {...props}/>)`
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: ${ (props) => props.alertProps.severity === AlertSeverity.SUCSESS ? 'darkgreen' : 'darkred'};
`


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

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up"/>;
}

type TransitionProps = Omit<SlideProps, 'direction'>;