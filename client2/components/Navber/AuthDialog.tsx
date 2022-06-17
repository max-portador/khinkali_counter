import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {Button, Dialog, Grid, TextField, Typography} from "@mui/material";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import {useActions} from "../../hooks/useActions";
import {useFormik} from "formik";

const validationSchema = yup.object({
    email: yup
        .string()
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});


const AuthDialog = () => {
    const {name} = useTypedSelectors(state => state.auth)
    const {logout, login} = useActions()
    const [isOpen, setIsOpen] = useState(!!name)

    useEffect(() => {
        if (name) {
            setIsOpen(false)
        }
    }, [name])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values: Values, formikHelpers) => {
            const {email, password} = values
            login(email, password)

            if (name) {
                formikHelpers.setSubmitting(false)
                formikHelpers.setErrors({password: 'wrong email ', email: 'or wrong password'})
            }
        },
    });

    return (
        <>
            <Dialog maxWidth='xl'
                    open={isOpen}
                    onClose={() => setIsOpen(false)}

            >
                <form onSubmit={formik.handleSubmit}>

                    <Grid container p={4} gap={1} width={400}
                          direction={'column'}
                          alignItems='center'
                    >
                        <Typography color={'primary'} variant='h5'>Вход </Typography>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button variant='contained' type="submit">
                            Отправить
                        </Button>
                    </Grid>
                </form>
            </Dialog>
            {name
                ? <Grid container alignSelf='center' alignItems='center' justifyContent='end'>
                    <Typography
                        sx={{
                            right: 280,
                            position: 'fixed',
                            textDecoration: 'hasDunderPages'
                        }}>
                        {name}
                    </Typography>
                    <AuthButton user={name} onClick={() => {
                        logout()
                    }}/>
                </Grid>

                : <AuthButton user={name} onClick={() => {
                    setIsOpen(true)
                }
                }/>

            }
        </>
    )
};

export default AuthDialog;

const AuthButton = (props) => {
    return <Button variant={'contained'}
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
}


interface Values {
    email: string;
    password: string;
}