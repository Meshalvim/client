import { Grid, TextField, FormLabel, Button, MenuItem, FormControl, InputLabel, Select, Alert } from "@mui/material";
import Swal from "sweetalert2"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object({
    name: Yup.string().required('שם זהו שדה חובה'),
    tel: Yup.string().required('טלפון זהו שדה חובה').matches(/^[0-9]+$/, 'מכיל רק ספרות').min(9, 'מינימום 7 ספרות').max(10, 'מקסימום 10 ספרות'),
    password: Yup.string().required('סיסמא זהו שדה חובה'),
    email: Yup.string().email('נא התאם לתבנית אימייל').required('אימייל זהו שדה חובה'),
    city: Yup.string().required('עיר זהו שדה חובה'),
})

const EmployerDetails = () => {

    const navigate = useNavigate()

const cityList=[
    {value:'Jerusalem',label:'Jerusalem'},
    {value:'TelAviv',label:'TelAviv'},
    {value:'BneBrak',label:'BneBrak'},
    {value:'RamatGan',label:'RamatGan'},
    {value:'Elad',label:'Elad'},
    {value:'BetShemesh',label:'BetShemesh'}
]

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, setFieldValue } = useFormik({
        initialValues: {
            name: '',
            tel: '',
            password: '',
            email: '',
            city: '',
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        },
    })

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" sx={{
                p: 5
            }}>
                <Grid
                    sx={{
                        p: 4,
                        border: '2px solid lightGrey',
                        borderRadius: '1vw',
                        margin: 'auto',
                        width: '50vw'
                    }}>

                    <FormLabel
                        sx={{
                            fontSize: '20px',
                            color: '#1976d2',
                        }}
                    >פרטי מעסיק</FormLabel>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            fullWidth
                            name="name"
                            id="name"
                            label="שם העסק"
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
                            name="tel"
                            type="text"
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
                            name="email"
                            type="email"
                            id="email"
                            label="email"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Alert severity="error">{errors.email}</Alert>}

                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            fullWidth
                            name="password"
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
                        <FormControl
                            fullWidth
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-label">עיר העסק</InputLabel>
                            <Select
                                labelId="select-label"
                                id="city"
                                name="city"
                                label="city"
                                value={values.city}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                            {cityList.map((city)=>{
                                debugger
                                <MenuItem key={city.value} value={city.value} >{city.label}</MenuItem>
                            })}
                                 <MenuItem value='Jerusalem'>ירושלים</MenuItem>
                               {/* <MenuItem value={'TelAviv'}>תל אביב</MenuItem>
                                <MenuItem value={'BneBrak'}>בני ברק</MenuItem>
                                <MenuItem value={'Jerusalem'}>רמת גן</MenuItem>
                                <MenuItem value={'Elad'}>אלעד</MenuItem>
                                <MenuItem value={'other'}>אחר</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <Button
                            disabled={!isValid}
                            variant="contained"
                            onClick={() => {
                                Swal.fire({
                                    title: '!!!שים לב',
                                    text: 'כעת עליך למלא את הטופס על פי הדרישות, על מנת שהתוצאה תצא מושלמת השתדל לדייק בנתונים ככל האפשר',
                                    icon: 'info',
                                    confirmButtonText: 'המשך',
                                    confirmButtonColor: '#3085d6',
                                }).then(
                                    (result) => {
                                        if (result.isConfirmed) {
                                            navigate('../manage')
                                        }
                                    })
                            }}

                        >להמשך התהליך</Button>
                    </Grid >
                </Grid>
            </Grid >
        </form>
    );
}

export default EmployerDetails;
