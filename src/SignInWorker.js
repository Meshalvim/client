import React, { useState, useEffect } from 'react';
import { TextField, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from 'axios';

const validationSchema = Yup.object({
    name: Yup.string().required('שם זהו שדה חובה'),
    password: Yup.string().required('סיסמא זהו שדה חובה'),
    identity: Yup.string().length(9, 'ת.ז. מכילה 9 ספרות').required('ת.ז. זהו שדה חובה').matches(/^[0-9]+$/, 'צריך להכיל רק ספרות'),
    tel: Yup.string().required('טלפון זהו שדה חובה').matches(/^[0-9]+$/, 'צריך להכיל רק ספרות').min(9, 'מינימום 9 ספרות').max(10, 'מקסימום 10 ספרות'),
    email: Yup.string().email('נא התאם לתבנית אימייל').required('אימייל זהו שדה חובה'),
    city: Yup.string().required('עיר זהו שדה חובה'),
})

const SignInWorker = () => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid } = useFormik({
        initialValues: {
            name: '',
            password: '',
            identity: '',
            tel: '',
            email: '',
            city: '',
        },
        validationSchema,
        onSubmit: (values) => {
            localStorage.setItem('user', JSON.stringify(values))
            {
                //values צריך לשלוח את   
                new swal({
                    title: '!!!' + values.name + ' שלום ',
                    icon: 'success',
                    text: '!!!פרטיך נקלטו בהצלחה במערכת',
                    confirmButtonText: 'המשך',
                    confirmButtonColor: '#3085d6',
                }).then(
                    (result) => {
                        if (result.isConfirmed) {
                            navigate('../candidateForm')
                        }
                    })
            }

        }
    })

    const url = `http://localhost:64672/api/cities`

    const [status, setStatus] = useState('employer');
    const [name, setName] = useState('')
    const [cities, setCities] = useState([])

    useEffect(() => {
        let c;
        axios.get(url).then(res => {
            setCities(res.data)
        })
    }, [5])

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
                                    color: 'deepPink',
                                }}
                            >הרשמה</FormLabel>

                            <IconButton
                                sx={{ color: '#1c8ab2' }}
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
                                error={errors.name && touched.name}
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
                                error={errors.identity && touched.identity}
                                name="identity"
                                id="identity"
                                label="ת.ז."
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.identity}
                            />
                            {errors.identity && touched.identity && <Alert severity="error">{errors.identity}</Alert>}
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                error={errors.tel && touched.tel}
                                name="tel"
                                id="tel"
                                label="טלפון"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tel}
                            />
                            {errors.tel && touched.tel && <Alert severity="error">{errors.tel}</Alert>}
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                error={errors.email && touched.email}
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

                        {/* <Grid item sx={{
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
                        </Grid> */}

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="city">עיר</InputLabel>
                                <Select
                                    labelId="city"
                                    id="city"
                                    name="city"
                                    value={values.city}
                                    label="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.city && touched.city}
                                >
                                    {
                                        cities.map((item, i) => {
                                            return <MenuItem key={i} value={item.name_city} className="menuItemAge">{item.name_city}</MenuItem>
                                        })}
                                </Select>
                            </FormControl>
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
                                    sx={{ backgroundColor: '#1c8ab2' }}
                                >להרשמה</Button>
                            </Grid>

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => { navigate('../logIn') }}
                                    sx={{ color: '#1c8ab2', borderColor: '#1c8ab2' }}
                                >משתמש רשום?</Button>
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </form >
    );
}

export default SignInWorker;