import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from "formik";
import swal from "sweetalert2";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const validationSchema = Yup.object(
    {
        id_gender: Yup.string().required('זהו שדה חובה'),
        age: Yup.number().min(18, 'אין העסקת קטינים').required('זהו שדה חובה'),
        seniority: Yup.number().min(0, 'לא יתכן ערך שלילי').required('זהו שדה חובה'),
        price: Yup.number().min(30, 'שלושים שקלים זהו שכר המינימום שלנו').required('זהו שדה חובה'),
    }
)
const CandidateForm = () => {

    const navigate = useNavigate();

    const [abilities, setAbilities] = useState([])

    const { handleBlur, handleChange, handleSubmit, values, touched, required, errors, dirty, isValid } = useFormik({
        initialValues: {
            id_gender: '',
            age: '',
            seniority: '',
            price: '',
        },
        validationSchema,
        onSubmit: (values) => {
            //abilities וכן את values signIn צריך לשלוח את
            const send={
                ...values,
                ...JSON.parse(localStorage.getItem('user'))
            }
            axios.post(url, send).then(response => {
                console.log(response);
            })
            new swal({
                title: '',
                icon: 'success',
                text: 'פרטיך נקלטו בהצלחה במערכת!!!',
                confirmButtonText: 'חזרה לדף הבית',
                confirmButtonColor: '#3085d6',
            }).then((result) => { if (result.isConfirmed) navigate('/') })
        }
    })

    useEffect(() => {
        let c;
        axios.get(uri).then(res => {
            if (!shownAbilities)
                setShownAbilities(res.data.data)
        })
    },);

    const [shownAbilities, setShownAbilities] = useState()
    const uri = 'http://localhost:64672/api/requirements'
    const url = 'http://localhost:64672/api/candidate'

    const addAbility = (ability, e) => {
        setAbilities([...abilities, ability])
        let a = shownAbilities.slice(0, e.target.id)
        let b = shownAbilities.slice(parseInt(e.target.id) + 1, shownAbilities.length)
        setShownAbilities(
            [...b, ...a])
    }
    const cancelGrade = () => {
        debugger
        setShownAbilities([...abilities, ...shownAbilities])
        console.log(shownAbilities)
        setAbilities([])
    }

    return (
        <div>
            {
                localStorage.getItem('user') != null && localStorage.getItem('status') == 'candidate' ?
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" sx={{
                            p: 2
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
                                            id="id_gender"
                                            name="id_gender"
                                            value={values.id_gender}
                                            onChange={handleChange}
                                            error={errors.id_gender}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="זכר" />
                                            <FormControlLabel value="2" control={<Radio />} label="נקבה" />
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
                                        name="seniority"
                                        id="seniority"
                                        label="מספר שנות ניסיון"
                                        variant="standard"
                                        value={values.seniority}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.seniority && touched.seniority}
                                    />
                                    {errors.seniority && touched.seniority && <Alert severity="error">{errors.seniority}</Alert>}
                                </Grid>

                                <Grid item sx={{
                                    p: 1,
                                    margin: 'auto',
                                }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        name="price"
                                        id="price"
                                        label="משכורת"
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.price && touched.price}
                                    />
                                    {errors.price && touched.price && <Alert severity="error">{errors.price}</Alert>}
                                </Grid>

                                <FormLabel
                                    sx={{
                                        fontSize: '20px',
                                        color: 'deepPink',
                                    }}
                                >דרג את יכולותיך</FormLabel>
                                <Grid container direction='row'>
                                    {
                                        shownAbilities &&
                                        shownAbilities.map((ability, index) => {
                                            return (
                                                <Button
                                                    id={index}
                                                    key={index}
                                                    onClick={(e) => addAbility(ability, e)}
                                                    sx={{ color: '#02c298' }}>{ability.name_req}</Button>
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
                                            return (<li key={index}><Grid>{ability.name_req}</Grid></li>)
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
                                        disabled={!dirty || !isValid || shownAbilities.length != 0}
                                        sx={{ backgroundColor: 'deepPink' }}
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