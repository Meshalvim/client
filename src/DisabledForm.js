import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import swal from "sweetalert2";
import * as Yup from 'yup'

const validationSchema = Yup.object(
    {
        gender: Yup.string().required('זהו שדה חובה'),
        age: Yup.number().min(18, 'אין העסקת קטינים').required('זהו שדה חובה'),
        experience: Yup.number().min(0, 'לא יתכן ערך שלילי').required('זהו שדה חובה'),
        salary: Yup.number().min(30, 'שלושים שקלים זהו שכר המינימום שלנו').required('זהו שדה חובה'),
        motor: Yup.number().min(1, 'הניקוד מתחיל מאחד').required(),
        physical: Yup.number().min(1, 'הניקוד מתחיל מאחד').required(),
        comunication: Yup.number().min(1, 'הניקוד מתחיל מאחד').required(),
        mental: Yup.number().min(1, 'הניקוד מתחיל מאחד').required(),
        real: Yup.number().min(1, 'הניקוד מתחיל מאחד').required(),

    }
)
const DisabledForm = () => {
    const { handleBlur, handleChange, handleSubmit, values, touched, required, errors, dirty, isValid } = useFormik({
        initialValues: {
            gender: '',
            age: '',
            experience: '',
            salary: '',
            motor: '',
            physical: '',
            comunication: '',
            mental: '',
            real: '',
        },
        validationSchema,
        onSubmit: (values) => {
            new swal({
                title: '',
                icon: 'success',
                text: 'פרטיך נקלטו בהצלחה במערכת!!!',
                confirmButtonText: 'המשך',
                confirmButtonColor: '#3085d6',
            })
        }
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
                    >פרטי מועמד</FormLabel>

                    <Grid item sx={{
                        p: 2,
                        margin: 'auto',
                    }}>
                        <FormControl>
                            <FormLabel>מין</FormLabel>
                            <RadioGroup
                                id="gender"
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                error={errors.gender}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="זכר" />
                                <FormControlLabel value="female" control={<Radio />} label="נקבה" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            type="number"
                            fullWidth
                            name="age"
                            id="age"
                            label="גיל"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.age && touched.age}
                        />
                        {errors.age && touched.age && <Alert severity="error">{errors.age}</Alert>}
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            type="number"
                            fullWidth
                            name="experience"
                            id="experience"
                            label="מספר שנות ניסיון"
                            variant="standard"
                            value={values.experience}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.experience && touched.experience}
                        />
                        {errors.experience && touched.experience && <Alert severity="error">{errors.experience}</Alert>}
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            type="number"
                            fullWidth
                            name="salary"
                            id="salary"
                            label="משכורת"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.salary && touched.salary}
                        />
                        {errors.salary && touched.salary && <Alert severity="error">{errors.salary}</Alert>}
                    </Grid>

                    <FormLabel
                        sx={{
                            fontSize: '20px',
                            color: '#1976d2',
                        }}
                    >דרג את יכולותיך</FormLabel>
                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                        width: '80'
                    }}>
                        <TextField
                            type="number"
                            fullWidth
                            name="motor"
                            id="motor"
                            label="מוטורית"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.motor && touched.motor}
                        />
                        {errors.motor && touched.motor && <Alert severity="error">{errors.min.motor}</Alert>}

                        <TextField
                            type="number"
                            fullWidth
                            name="comunication"
                            id="comunication"
                            label="תקשורתית"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.comunication && touched.comunication}
                        />
                        {errors.comunication && touched.comunication && <Alert severity="error">{errors.min.comunication}</Alert>}

                        <TextField
                            type="number"
                            fullWidth
                            name="real"
                            id="real"
                            label="ריאלית"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.real && touched.real}
                        />
                        {errors.real && touched.real && <Alert severity="error">{errors.min.real}</Alert>}

                        <TextField
                            type="number"
                            fullWidth
                            name="mental"
                            id="mental"
                            label="מנטלית"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.mental && touched.mental}
                        />
                        {errors.mental && touched.mental && <Alert severity="error">{errors.min.mental}</Alert>}

                        <TextField
                            type="number"
                            fullWidth
                            name="physical"
                            id="physical"
                            label="פיזית"
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.physical && touched.physical}
                        />
                        {errors.physical && touched.physical && <Alert severity="error">{errors.min.physical}</Alert>}

                    </Grid>
                    {!dirty.salary && touched.salary || !dirty.physical && touched.physical ||
                        !dirty.mental && touched.mental || !dirty.real && touched.real || !dirty.motor && touched.motor
                        && <Alert severity="error">עליך לדרג את כל היכולות לעיל</Alert>}

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!dirty || !isValid }
                        >שמור</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default DisabledForm;