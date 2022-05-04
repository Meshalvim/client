import React, { useState } from 'react';
import { TextField, Grid, FormLabel,  Button, Alert, IconButton } from '@mui/material';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useFormik } from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object({
    name: Yup.string().required('שם זהו שדה חובה'),
    password: Yup.string().required('סיסמא זהו שדה חובה'),
    city: Yup.string().required('עיר זהו שדה חובה'),
})

const SignInEmployer = () => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid } = useFormik({
        initialValues: {
            name: '',
            password: '',
            city: '',
        },
        validationSchema,
        onSubmit: (values) => {
            localStorage.setItem('user', JSON.stringify(values))
            {
                new swal({
                    title: '!!!' + values.name + ' שלום ',
                    icon: 'success',
                    text: '!!!פרטיך נקלטו בהצלחה במערכת',
                    confirmButtonText: 'המשך',
                    confirmButtonColor: '#3085d6',
                }).then(
                    (result) => {
                        if (result.isConfirmed) {
                            navigate('../employerDemands')
                        }
                    })
            }

        }
    })

    const [status, setStatus] = useState('lookingForJob');
    const [name, setName] = useState('')

    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        setStatus(event.target.value);
    }


    return (

        <form onSubmit={handleSubmit}>
            <Grid container direction="column" sx={{ p: 5 }}>
                <Grid item sx={{
                    p: 1,
                    margin: 'auto',
                    width: '45vw'

                }}>
                    <Grid
                        sx={{
                            p: 4,
                            border: '2px solid lightGrey',
                            borderRadius: '1vw',
                            margin: 'auto',
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
                            >הרשמה</FormLabel>

                            <IconButton
                                variant="outlined"
                                onClick={() => { navigate('/') }}
                            >
                                <ArrowBackRoundedIcon />

                            </IconButton>
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                error={errors.name && touched.name}
                                name="name"
                                id="name"
                                label="שם החברה"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && <Alert severity="error">{errors.name}</Alert>}
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                error={errors.password && touched.password}
                                id="password"
                                type="password"
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
                            <TextField
                                fullWidth
                                error={errors.city && touched.city}
                                name="city"
                                id="city"
                                label="עיר"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                            />
                            {errors.city && touched.city && <Alert severity="error">{errors.city}</Alert>}
                        </Grid>

                        <Grid container direction="row"  >

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <Button
                                    type='submit'
                                    disabled={!dirty || !isValid}
                                    variant="contained"
                                >להרשמה</Button>
                            </Grid>

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => { navigate('../logIn') }}
                                >משתמש רשום?</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default SignInEmployer;