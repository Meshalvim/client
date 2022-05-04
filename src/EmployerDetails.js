import { Grid, TextField, FormLabel, Button, MenuItem, FormControl, InputLabel, Select, Alert} from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"

const EmployerDetails = () => {
    const validationSchema = Yup.object({
        name: Yup.string().required('שם זהו שדה חובה'),
        password: Yup.string().required('סיסמא זהו שדה חובה'),
        email: Yup.string().email('נא התאם לתבנית אימייל').required('אימייל זהו שדה חובה'),
        city: Yup.string().required('עיר זהו שדה חובה'),
    })
    const navigate = useNavigate()

    const cityList = [
        'ירושלים', 'תל אביב', 'בני ברק', 'רמת גן', 'אלעד', 'בית שמש'
    ]

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = useFormik({
        initialValues: {
            name: '',
            tel: '',
            password: '',
            email: '',
            city: '',
        },
        validationSchema,
        onSubmit: (values) => {
            Swal.fire({
                title: '!!!שים לב',
                text: 'כעת עליך למלא את הטופס על פי הדרישות, על מנת שהתוצאה תצא מושלמת השתדל לדייק בנתונים ככל האפשר',
                icon: 'info',
                confirmButtonText: 'המשך',
                confirmButtonColor: '#3085d6',
            }).then(
                (result) => {
                    if (result.isConfirmed) {
                        navigate('../employerDemands')
                    }
                })
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
                            error={errors.name && touched.name}
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
                            error={errors.tel && touched.tel}
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
                            error={errors.email && touched.email}
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
                            error={errors.password && touched.password}
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
                            variant="standard">
                            {/* sx={{ m: 1, minWidth: 120 }} */}
                            <InputLabel id="select-label">עיר העסק</InputLabel>
                            <Select
                                error={errors.city && touched.city}
                                labelId="select-label"
                                id="city"
                                name="city"
                                label="city"
                                value={values.city}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                                {cityList.map((item, i) => {
                                    return <MenuItem key={i} value={item} className="menuItemAge">{item}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {errors.city && touched.city && <Alert severity="error">{errors.city}</Alert>}
                    </Grid>


                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <Button
                            type="submit"
                            disabled={!dirty || !isValid}
                            variant="contained"
                        >להמשך התהליך</Button>
                    </Grid >
                </Grid>
            </Grid >
        </form>
    );
}

export default EmployerDetails;
