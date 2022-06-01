import React, { useState, useEffect } from 'react';
import { TextField, Grid, FormLabel, Button, Alert, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from 'axios';

const validationSchema = Yup.object({
    name_company: Yup.string().required('שם זהו שדה חובה'),
    password: Yup.string().required('סיסמא זהו שדה חובה'),
    id_city: Yup.string().required('עיר זהו שדה חובה'),
})

const SignInEmployer = () => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid } = useFormik({
        initialValues: {
            name_company: '',
            password: '',
            id_city: '',
        },  
        validationSchema,
        onSubmit: (values) => {
            //values צריך לשלוח את   
            localStorage.setItem('user', JSON.stringify(values))
            {
                new swal({
                    title:`שלום ${values.name_company} `,
                    icon: 'success',
                    text: 'פרטיך נקלטו בהצלחה במערכת',
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
    const [cities, setCities] = useState([])
    const uri = `http://localhost:64672/api/cities`

    useEffect(() => {
        let c;
        axios.get(uri).then(res => {
            setCities(res.data)
        })
    })

    const handleRadioChange = (event) => {
        setStatus(event.target.value);
    }


    return (

        <form onSubmit={handleSubmit}>
            <Grid container direction="column" sx={{ p: 5 }}>
                <Grid item sx={{
                    p: 1,
                    margin: 'auto',
                    width: '35vw'
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
                                    color: '#02c298',
                                }}
                            >הרשמה</FormLabel>

                            <IconButton sx={{ color: '#02c298' }}
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
                                error={errors.name_company_ && touched.name_company_}
                                name="name_company"
                                id="name_company"
                                label="שם החברה"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name_company}
                            />
                            {errors.name_company && touched.name_company && <Alert severity="error">{errors.name_company}</Alert>}
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
                                autoComplete='false'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && <Alert severity="error">{errors.password}</Alert>}
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
                                    label="city"
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
                            {errors.id_city && touched.id_city && <Alert severity="error">{errors.id_city}</Alert>}
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
                                    sx={{ backgroundColor: '#02c298' }}
                                >להרשמה</Button>
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
        </form>
    );
}

export default SignInEmployer;