import React, { useState } from 'react';
import { TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert } from '@mui/material';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useFormik } from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object({
    name: Yup.string().required('שם זהו שדה חובה'),
    password: Yup.string().required('סיסמא זהו שדה חובה'),
    email: Yup.string().email('נא התאם לתבנית אימייל').required('אימייל זהו שדה חובה'),
})

const SignIn = () => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
        initialValues: {
            name: '',
            password: '',
            email: '',
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        },
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
                {JSON.stringify(errors)}
                <Grid item sx={{
                    p: 1,
                    margin: 'auto',
                    width: '50vw'

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

                            <Button
                                variant="outlined"
                                endIcon={<ArrowBackRoundedIcon />}
                                onClick={() => { navigate('/') }}
                            >
                                חזרה לדף הבית...
                            </Button>
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                name="name"
                                id="name"
                                label="שם"
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
                                id="email"
                                type="email"
                                label="אימייל"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {/* <Alert severity="error">בתבנית אימייל!!!</Alert> */}
                            {errors.email && errors.email && touched.email && <Alert severity="error">{errors.email}</Alert>}
                        </Grid>

                        <Grid item sx={{
                            p: 2,
                            margin: 'auto',
                        }}>
                            <FormControl>
                                <FormLabel>סמן סטטוס</FormLabel>
                                <RadioGroup
                                    name="controlled-radio-buttons-group"
                                    value={status}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value="employer" control={<Radio />} label="מעסיק" />
                                    <FormControlLabel value="lookingForJob" control={<Radio />} label="מחפש עבודה" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid container direction="row"  >

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <Button
                                    disabled={!isValid}
                                    variant="contained"
                                    onClick={() => {
                                        new swal({
                                            title: '!!!' + values.name + ' שלום ',
                                            icon: 'success',
                                            text: '!!!פרטיך נקלטו בהצלחה במערכת',
                                            confirmButtonText: 'המשך',
                                            confirmButtonColor: '#3085d6',
                                        }).then(
                                            (result) => {
                                                if (result.isConfirmed) {
                                                    if (status === 'employer')
                                                        navigate('../employerDetails')
                                                    else
                                                        navigate('../disabledForm')
                                                }
                                            })
                                    }}

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

export default SignIn;