import { Grid, TextField, FormLabel, Button, Alert, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object({
    password: Yup.string().required('סיסמא זהו שדה חובה'),
})

const ManagerLogin = () => {
    const navigate=useNavigate()
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
                    text: '!!!האימות הצליח',
                    confirmButtonText: 'המשך',
                    confirmButtonColor: '#3085d6',
                }).then((result)=>{if(result.isConfirmed){navigate('../manager')}})
                (
                    (result) => {
                        if (result.isConfirmed) {
                            navigate('../employerDemands')
                        }
                    })
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
        <form onSubmit={handleSubmit} >
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
                                color: 'deepPink',
                            }}
                        >כניסה</FormLabel>

                        <IconButton 
                            sx={{color:'deepPink'}}
                            onClick={() => { navigate('/') }}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
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
                            sx={{backgroundColor:'deepPink'}}
                        >לכניסה</Button>
                    </Grid>

                </Grid>
            </Grid>
        </form>
    );
}

export default ManagerLogin;