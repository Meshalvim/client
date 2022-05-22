import { Backdrop, CircularProgress, Grid, TextField, FormLabel, Button, Alert, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object({
    password: Yup.string().required('סיסמא זהו שדה חובה'),
})

const Manager = () => {
    const navigate = useNavigate()
    const [enable, setEnable] = useState(true)
    const [showBackdrop, setShowBackdrop] = useState(false)

    const algorithm = () => {
        setShowBackdrop(true)
        console.log('start ' + showBackdrop)
        getRiverInformation().then(
            d => setShowBackdrop(d)
        ).then(() => { navigate('../scheduling') })
    }

    const getRiverInformation = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(false)
            }, 10000)
        })
    }
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid } = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            //check if it's correct password of the manager of the system
            //if (values.password)
            Swal.fire({
                title: 'שלום!',
                icon: 'info',
                text: 'האימות הצליח!!!',
                confirmButtonText: 'המשך',
                confirmButtonColor: '#3085d6',
            }).then((result) => { if (result.isConfirmed) { setEnable(false) } })

            // else {
            //     Swal.fire({
            //         title: '',
            //         icon: 'error',
            //         text: 'סיסמא שגויה',
            //         confirmButtonText: 'חזרה לדף הבית',
            //         showCancelButton: true,
            //         cancelButtonText: 'להזנת הסיסמא מחדש',
            //         confirmButtonClass: 'btn-danger',
            //         cancelButtonClass: 'btn-danger',
            //         confirmButtonColor: '#3085d6',
            //     }).then(
            //         (result) => {
            //             if (result.isConfirmed) {
            //                     navigate('/')
            //             }
            //         })
            // }
        },
    })

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" sx={{
                    p: 5,
                }}>
                    <Grid
                        sx={{
                            p: 4,
                            border: '2px solid lightGrey',
                            borderRadius: '1vw',
                            margin: 'auto',
                            width: '35vw',
                        }}>
                        <Grid
                            container
                            direction='row'
                            justifyContent="space-between">
                            <FormLabel
                                sx={{
                                    fontSize: '20px',
                                    color: '#1976d2',
                                }}
                            >כניסה</FormLabel>

                            <IconButton onClick={() => { navigate('/') }}><ArrowBackRoundedIcon /></IconButton>
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                error={errors.password && touched.password}
                                name='password'
                                id='password'
                                type='password'
                                label="סיסמא"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && <Alert severity="error">{errors.password}</Alert>}
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <Button
                                disabled={!dirty || !isValid}
                                type="submit"
                                variant="contained"
                            >לכניסה</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </form>
            <Grid
                sx={{
                    p: 4,
                    margin: 'auto',
                    width: '20vw',
                    mt:'10vh'
                }}>
                <Button
                    variant="contained"
                    color="success"
                    disabled={enable}
                    onClick={() => { algorithm() }}
                >
                    לשיבוץ עובדים על פי הנתונים שנשמרו ...
                </Button>
            </Grid>
            <Backdrop

                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showBackdrop}
            >
                <CircularProgress color="inherit" />
                <h1 width='100vw'>אנא המתן...</h1>
            </Backdrop>
        </>
    );
}

export default Manager;