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
    const [shownAbilities, setShownAbilities] = useState()
    const [genders, setGenders] = useState([])
    const uri = 'http://localhost:64672/api/requirements'
    const url = 'http://localhost:64672/api/candidate'
    const urlGender = `http://localhost:64672/api/gender`

    const { handleBlur, handleChange, handleSubmit, values, touched, required, errors, dirty, isValid } = useFormik({
        initialValues: {
            id_gender: '',
            age: '',
            seniority: '',
            price: '',
        },
        validationSchema,
        onSubmit: (values) => {
            let sendAbilities=[];
            for (let i = 0; i < abilities.length; i++) {
                sendAbilities[i] = {
                    id_candidate: '',
                    id_req: abilities[i].id_req,
                    num_priority: i
                }
            }
            const send = {
                /* public int id_candidate { get; set; } האם בשרת יש השמה של משתנה זה? ז*/
                Candidate: {
                    Id_number: (JSON.parse(localStorage.getItem('user'))).Id_number,
                    name_: (JSON.parse(localStorage.getItem('user'))).name_,
                    phone: (JSON.parse(localStorage.getItem('user'))).phone,
                    email: (JSON.parse(localStorage.getItem('user'))).email,
                    id_city: (JSON.parse(localStorage.getItem('user'))).id_city,
                    password_: (JSON.parse(localStorage.getItem('user'))).password_,
                    ...values,
                },
                /* public int id_candidate { get; set; } האם בשרת יש השמה של משתנה זה? ז*/
                FavoriteReqs: sendAbilities
            }
            axios.post(url, send).then(response => {
                console.log(response);
                if(response==true)
                {       new swal({
                    title: '',
                    icon: 'success',
                    text: 'פרטיך נקלטו בהצלחה במערכת!!!',
                    confirmButtonText: 'חזרה לדף הבית',
                    confirmButtonColor: '#3085d6',
                }).then((result) => { if (result.isConfirmed) navigate('/') })}
                else{
                    swal.fire({
                        title: '',
                        icon: 'error',
                        text: 'בעיה בשרת',
                        confirmButtonText: 'חזרה לדף הבית',
                        showCancelButton: true,
                        cancelButtonText: 'לניסיון חוזר',
                        confirmButtonClass: 'btn-danger',
                        cancelButtonClass: 'btn-danger',
                        confirmButtonColor: '#3085d6',
                    }).then( (result) => {
                        if (result.isConfirmed) {
                                navigate('/')
                        }
                    })
                }
            
            })
        }
    })

    useEffect(() => {
        let c;
        axios.get(uri).then(res => {
            if (!shownAbilities)
                //id_req name_req
                setShownAbilities(res.data.data)
        })
    });

    useEffect(() => {
        let c;
        axios.get(urlGender).then(res => {
            setGenders(res.data.data)
        })
    }, [2])

    const addAbility = (ability, e) => {
        setAbilities([...abilities, ability])
        let a = shownAbilities.slice(0, e.target.id)
        let b = shownAbilities.slice(parseInt(e.target.id) + 1, shownAbilities.length)
        setShownAbilities(
            [...b, ...a])
    }
    const cancelGrade = () => {
        // debugger
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
                                            {genders.map((item, i) => {
                                                return <FormControlLabel key={i} value={item.id_gender} control={<Radio />} label={item.name_gender} />
                                            })}
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