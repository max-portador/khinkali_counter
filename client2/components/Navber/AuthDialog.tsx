import React, {useState} from 'react';
import {Button, Dialog, Grid, TextField} from "@mui/material";
import styled from "styled-components";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import {useActions} from "../../hooks/useActions";

const AuthDialog = () => {
    const {name} = useTypedSelectors(state => state.auth)
    const {setUser, clearUser} = useActions()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Dialog maxWidth='xl' open={isOpen} onClose={() => setIsOpen(false)}>
                <Grid container p={4} gap={4} width={400} direction={'column'}>
                    <TextField label='email' type='email'/>
                    <TextField label='password' type='password'/>
                    <Button
                        variant={'outlined'}
                        onClick={() => {
                        setUser('Ван')
                        setIsOpen(false)
                    }}>Submit</Button>
                </Grid>
            </Dialog>
            {name
                ? <AuthButton user={name} onClick={() =>
                {
                    clearUser()

                }}/>
                : <AuthButton user={name} onClick={() => {
                    setIsOpen(true)
                }
                }/>

            }
        </>
    )
};

export default AuthDialog;

const AuthButton = styled((props) =>
    <Button variant={'contained'}
            {...props}
            sx={{
                backgroundColor: 'white',
                color: '#333',
                position: 'fixed',
                right: 120,
                width: 120,
                '&:hover': {
                    backgroundColor: 'grey !important',
                    color: '#fff'
                },
            }}>
        {props.user ? 'Logout' : 'Login'}
    </Button>
)`
`