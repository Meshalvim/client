import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from "formik";
import swal from "sweetalert2";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useState } from "react";

const validationSchema = Yup.object(
    {
        gender: Yup.string().required('זהו שדה חובה'),
        age: Yup.number().min(18, 'אין העסקת קטינים').required('זהו שדה חובה'),
        experience: Yup.number().min(0, 'לא יתכן ערך שלילי').required('זהו שדה חובה'),
        salary: Yup.number().min(30, 'שלושים שקלים זהו שכר המינימום שלנו').required('זהו שדה חובה'),
    }
)
const CandidateForm = () => {

    const navigate = useNavigate();

    const [abilities, setAbilities] = useState([])

    const { handleBlur, handleChange, handleSubmit, values, touched, required, errors, dirty, isValid } = useFormik({
        initialValues: {
            gender: '',
            age: '',
            experience: '',
            salary: '',
        },
        validationSchema,
        onSubmit: (values) => {
            //abilities וכן את values צריך לשלוח את
            new swal({
                title: '',
                icon: 'success',
                text: 'פרטיך נקלטו בהצלחה במערכת!!!',
                confirmButtonText: 'חזרה לדף הבית',
                confirmButtonColor: '#3085d6',
            }).then((result) => { if (result.isConfirmed) navigate('/') })
        }
    })

    const [shownAbilities, setShownAbilities] = useState(['תקשורתית', 'מוטורית', 'ריאלית', 'פיזית', 'מנטלית'])

    const addAbility = (e) => {
        setAbilities([...abilities, e.target.outerText])
        debugger
        let a = shownAbilities.slice(0, e.target.id)
        let b = shownAbilities.slice(parseInt(e.target.id) + 1, shownAbilities.length)
        setShownAbilities(
            [...b, ...a])
    }
    const cancelGrade = () => {
        setShownAbilities([...abilities, ...shownAbilities])
        setAbilities([])
    }

    return (
        <div>
            {
                localStorage.getItem('user') != null && localStorage.getItem('status') == 'worker' ?
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

                                <Grid
                                    container
                                    direction='row'
                                    justifyContent="space-between">
                                    <FormLabel
                                        sx={{
                                            fontSize: '20px',
                                            color: 'deepPink',
                                        }}
                                    >פרטי מועמד</FormLabel>
                                    <IconButton color="error"
                                        onClick={() => {
                                            new swal({
                                                title: 'אתה בטוח שברצונך לצאת?',
                                                icon: 'warning',
                                                text: 'אם תצא כעת פרטיך לא ישמרו במערכת',
                                                confirmButtonText: 'חזרה לדף הבית',
                                                confirmButtonColor: '#3085d6',
                                            }).then((result) => { if (result.isConfirmed) navigate('/') })
                                        }}>
                                        <ClearIcon></ClearIcon>
                                    </IconButton>
                                </Grid>
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
                                        color: 'deepPink',
                                    }}
                                >דרג את יכולותיך</FormLabel>
                                <Grid container direction='row'>
                                    {
                                        shownAbilities.map((ability, index) => {
                                            return (
                                                <Button 
                                                id={index} 
                                                key={index} 
                                                onClick={(e) => addAbility(e)}
                                                sx={{color:'deepPink'}}>{ability}</Button>
                                            )
                                        })}
                                    {abilities.length > 0 &&
                                        <Button variant="outlined" color="error" onClick={cancelGrade}>בטל דירוג
                                            <ClearIcon></ClearIcon>
                                        </Button>}
                                </Grid>
                                <Grid container direction='column'>
                                    <ol>
                                        {abilities.map((ability, index) => {
                                            return (<li key={index}><Grid>{ability}</Grid></li>)
                                        })}
                                    </ol>
                                </Grid>

                                <Grid item sx={{
                                    p: 1,
                                    margin: 'auto',
                                }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid || shownAbilities.length!=0}
                                        sx={{backgroundColor:'deepPink'}}
                                    >שמור</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form> :
                    <Grid>
                        אינך משתמש מורשה לכניסה הרשם בדף הבית !!
                </Grid>
            }
        </div>
    );
}

export default CandidateForm;