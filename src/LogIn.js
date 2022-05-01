import { Grid, TextField, FormLabel, Button, Alert } from "@mui/material";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object({
    name: Yup.string().required('שם זהו שדה חובה'),
    password: Yup.string().required('סיסמא זהו שדה חובה'),
})

const LogIn = () => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
           alert( JSON.stringify(values))
        },
    })

    const navigate = useNavigate();

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
                        width: '50vw',
                    }}>

                    <FormLabel
                        sx={{
                            fontSize: '20px',
                            color: '#1976d2',
                        }}
                    >כניסה</FormLabel>

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
                            name='password'
                            id='password'
                            type='password'
                            label="סיסמא"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.password && touched.password && <Alert severity="error">{errors.password}</Alert>}
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <Button
                            disabled={!isValid}
                            type="submit"
                            variant="contained"
                        // onClick={() => {
                        //     const exists = checkIfExist()
                        //     if (exists)
                        //         Swal.fire({
                        //             title: '!!!' + ' שלום ' + values.name,
                        //             icon: 'info',
                        //             text: '!!!אתה מועבר לטופס לבקשת עבודה, בהצלחה',
                        //             confirmButtonText: 'המשך',
                        //             confirmButtonColor: '#3085d6',
                        //         })
                        //     else {
                        //         Swal.fire({
                        //             title: 'שגיאה!',
                        //             icon: 'error',
                        //             text: 'משתמש לא קיים!',
                        //             confirmButtonText: 'מעבר לרישום',
                        //             showCancelButton: true,
                        //             cancelButtonText: 'להזנת הפרטים מחדש',
                        //             confirmButtonClass: 'btn-danger',
                        //             cancelButtonClass: 'btn-danger',
                        //             // confirmButtonColor: '#3085d6',
                        //         }).then(
                        //             (result) => {
                        //                 if (result.isConfirmed)
                        //                     navigate('../signIn')
                        //             })
                        //     }

                        // }}
                        >לכניסה</Button>
                    </Grid>

                </Grid>
            </Grid>
        </form>
    );
}

export default LogIn;