import React, { useState, useEffect } from 'react';
import { TextField, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from 'axios';

const validationSchema = Yup.object({
    name_: Yup.string().required('שם זהו שדה חובה'),
    password_: Yup.string().required('סיסמא זהו שדה חובה'),
    Id_number: Yup.string().length(9, 'ת.ז. מכילה 9 ספרות').required('ת.ז. זהו שדה חובה').matches(/^[0-9]+$/, 'צריך להכיל רק ספרות'),
    phone: Yup.string().required('טלפון זהו שדה חובה').matches(/^[0-9]+$/, 'צריך להכיל רק ספרות').min(9, 'מינימום 9 ספרות').max(10, 'מקסימום 10 ספרות'),
    email: Yup.string().email('נא התאם לתבנית אימייל').required('אימייל זהו שדה חובה'),
    id_city: Yup.string().required('עיר זהו שדה חובה'),
})

const SignInWorker = (props) => {
    const location = useLocation()

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid } = useFormik({
        initialValues:
            location.state != null ? location.state.user.Candidate :
                {
                    name_: '',
                    password_: '',
                    Id_number: '',
                    phone: '',
                    email: '',
                    id_city: '',
                }
        ,
        validationSchema,
        onSubmit: (values) => {
            localStorage.setItem('user', JSON.stringify({ Candidate: values }))
            new swal({
                title: `שלום ${values.name_} !!!`,
                icon: 'success',
                text: 'פרטיך נקלטו בהצלחה במערכת!!!',
                confirmButtonText: 'המשך',
                confirmButtonColor: '#3085d6',
            }).then(
                (result) => {
                    if (result.isConfirmed) {
                        navigate('../candidateForm')
                    }
                })
        }
    })

    const urlCities = `http://localhost:64672/api/cities`

    const [status, setStatus] = useState('employer');
    const [name, setName] = useState('')
    const [cities, setCities] = useState([])

    useEffect(() => {
        let c;
        axios.get(urlCities).then(res => {
            setCities(res.data)
        })
    }, [5])

    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        setStatus(event.target.value);
    }

    const editDetailsPut = () => {
        //PUT(values, id)
        //
        axios.put(`http://localhost:64672/api/candidate/${values.name_}`, {
            Candidate: values,
        }).then(
            new swal({
                title: 'שלום ' + values.name_ + '!!!',
                icon: 'success',
                text: 'פרטיך עודכנו בהצלחה במערכת!!!',
                confirmButtonText: 'חזרה לדף הבית',
                confirmButtonColor: '#3085d6',
            }).then(
                (result) => {
                    if (result.isConfirmed) {
                        navigate('/')
                    }
                }))

        // debugger
        // localStorage.setItem('user', JSON.stringify({ Candidate: values }))
        // new swal({
        //     title: 'שלום ' + values.name_ + '!!!',
        //     icon: 'success',
        //     text: 'פרטיך עודכנו בהצלחה במערכת!!!',
        //     confirmButtonText: 'המשך לעריכת טופס הדרישות',
        //     confirmButtonColor: '#3085d6',
        // }).then(
        //     (result) => {
        //         if (result.isConfirmed) {
        //             navigate('/')
        //         }
        //     })

    }

    return (

        <form onSubmit={handleSubmit}>
            <Grid container direction='row'>
                <Grid container direction="column" item sx={{ p: 5 }}>
                    <Grid item sx={{
                        p: 1,
                        width: '35vw',
                        margin: 'auto'
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
                                    sx={{ color: '#02c298' }}
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
                                    error={errors.name_ && touched.name_}
                                    name="name_"
                                    id="name_"
                                    label="שם"
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name_}
                                    disable={location.state}
                                />
                                {errors.name_ && touched.name_ && <Alert severity="error">{errors.name_}</Alert>}
                            </Grid>

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <TextField
                                    fullWidth
                                    autoComplete='false'
                                    error={errors.password_ && touched.password_}
                                    id="password_"
                                    type="password"
                                    label="סיסמא"
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password_}
                                />
                                {errors.password_ && touched.password_ && <Alert severity="error">{errors.password_}</Alert>}
                            </Grid>

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <TextField
                                    // disabled={location.state}
                                    fullWidth
                                    error={errors.Id_number && touched.Id_number}
                                    name="Id_number"
                                    id="Id_number"
                                    label="ת.ז."
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Id_number}
                                />
                                {errors.Id_number && touched.Id_number && <Alert severity="error">{errors.Id_number}</Alert>}
                            </Grid>

                            <Grid item sx={{
                                p: 1,
                                margin: 'auto',
                            }}>
                                <TextField
                                    fullWidth
                                    error={errors.phone && touched.phone}
                                    name="phone"
                                    id="phone"
                                    label="טלפון"
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                                {errors.phone && touched.phone && <Alert severity="error">{errors.phone}</Alert>}
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
                                    <InputLabel id="id_city">עיר</InputLabel>
                                    <Select
                                        labelId="id_city"
                                        id="id_city"
                                        name="id_city"
                                        value={values.id_city}
                                        label="id_city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.id_city && touched.id_city}
                                    >
                                        {
                                            cities.map((item, i) => {
                                                return <MenuItem key={i} value={item.id_city} className="menuItemAge">{item.name_city}</MenuItem>
                                            })}
                                    </Select>
                                </FormControl>
                                {console.log(values.id_city)}
                                {errors.city && touched.city && <Alert severity="error">{errors.city}</Alert>}
                            </Grid>


                            <Grid container direction="row"  >

                                <Grid item sx={{
                                    p: 1,
                                    margin: 'auto',
                                }}>
                                    {location.state ?

                                        <Button
                                            onClick={editDetailsPut}
                                            disabled={!isValid}
                                            variant="contained"
                                            sx={{ backgroundColor: '#02c298' }}
                                        >לעדכון פרטים</Button> :
                                        <Button
                                            type='submit'
                                            disabled={!dirty || !isValid}
                                            variant="contained"
                                            sx={{ backgroundColor: '#02c298' }}
                                        >להרשמה</Button>
                                    }
                                </Grid>

                                <Grid item sx={{
                                    p: 1,
                                    margin: 'auto',
                                }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => { navigate('../logIn') }}
                                        sx={{ color: '#02c298', borderColor: '#02c298' }}
                                    >משתמש רשום?</Button>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
                <Grid item style={{ position: "fixed", bottom: 0, left: 0 }}>
                    <img src={require('./images/3.png')}></img>
                </Grid>
                <Grid item style={{ position: "fixed", bottom: 0, right: 0 }}>
                    <img src={require('./images/3.png')}></img>
                </Grid>
            </Grid>
        </form >
    );
}

export default SignInWorker;