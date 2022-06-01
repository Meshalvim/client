import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, ListItemText, Checkbox, Chip, ListItem, Tooltip, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import HomePage from './HomePage'
import axios from "axios";

const validationSchema = Yup.object({
    abilities: Yup.array().min(1, 'זהו שדה חובה'),
    age_range: Yup.string().required('זהו שדה חובה'),
    seniority_range: Yup.number().min(0, 'לא יתכן מספר שלילי').required('זהו שדה חובה'),
    amount: Yup.number().min(1, 'לפחות אחד').required('זהו שדה חובה'),
    ageScore: Yup.number().min(0, 'הניקוד גדול מאפס').required('זהו שדה חובה'),
    experienceScore: Yup.number().min(0, 'הניקוד גדול מאפס').required('זהו שדה חובה'),
    genderScore: Yup.number().min(0, 'הניקוד גדול מאפס').required('זהו שדה חובה'),
});
const EmployerDemands = () => {

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, isValid, dirty } = useFormik({
        initialValues: {
            abilities: [],
            id_gender: '',
            age_range: '',
            seniority_range: '',
            amount: '',
            ageScore: '',
            experienceScore: '',
            genderScore: '',
        },

        validationSchema,
        onSubmit: (values) => {
            //gradedAbilities וכן את values צריך לשלוח את   
            // values.abilities ב gradedAbilities ניתן לשים את)
            //( values ואז לא יצטרכו לשלוח עוד משהו חוץ מ 

            const send = {
                ...{
                    password: JSON.parse(localStorage.getItem('user')).password,
                    name_company: JSON.parse(localStorage.getItem('user')).name_company
                },
                ...{
                    age_range: values.age_range,
                    seniority_range: values.seniority_range,
                    //id_company in the C#
                    id_city: JSON.parse(localStorage.getItem('user')).id_city,
                    id_gender: values.id_gender,
                    amount: values.amount,
                },
                ...{
                    score_time: values.score_time,
                    score_gender: values.score_gender,
                    // score_age:values.,
                    score_seniority: values.score_seniority,
                },
                
            }
            axios.post(url, send).then(response => {
                console.log(response);
            }).then(
                swal.fire({
                    title: '',
                    text: 'הפרטים נקלטו בהצלחה!! המשך יום מוצלח!!! ',
                    icon: 'success',
                    confirmButtonText: 'חזרה לדף הבית',
                    confirmButtonColor: '#3085d6',
                }).then(() => { navigate('/') })
            )
        }
    });

    const ages = ["18 - 22", "23 - 28", "29 - 33", "34 - 38", "39 - 43", "44 - 48", "49 - 53", "54 - 60"];
    const navigate = useNavigate()
    const [gradedAbilities, setGradedAbilities] = useState([])
    const [shownAbilities, setShownAbilities] = useState(values.abilities)
    const [genders, setGenders] = useState([])
    const [abilitiesArr, setAbilitiesArr] = useState([])
    const urlGender = `http://localhost:64672/api/gender`
    const uri = 'http://localhost:64672/api/requirements'
    const url = 'http://localhost:64672/api/job'
    //MenuProps
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        axios.get(uri).then(res => {
            setAbilitiesArr(res.data.data)
        })
    })

    useEffect(() => {
        let c;
        axios.get(urlGender).then(res => {
            setGenders(res.data.data)
        })
    }, [2])

    const addAbility = (e) => {
        setGradedAbilities([...gradedAbilities, e.target.outerText])
        debugger
        let a = shownAbilities.slice(0, e.target.id)
        let b = shownAbilities.slice(parseInt(e.target.id) + 1, shownAbilities.length)
        setShownAbilities([...b, ...a])
    }
    const cancelGrade = () => {
        setShownAbilities([...values.abilities])
        setGradedAbilities([])
    }
    const noUser = () => {
        navigate('../')
    }

    return (
        <div>

            {
                localStorage.getItem('user') != null && localStorage.getItem('status') == 'employer' ?
                    <form onSubmit={handleSubmit} >
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
                                    >דרישות מעסיק</FormLabel>

                                    {/* <Tooltip title="Clear" className="tooltip"> */}
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
                                    {/* </Tooltip> */}
                                </Grid>

                                <Grid item sx={{
                                    p: 2,
                                    margin: 'auto',
                                }}>
                                    <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }} >
                                        <InputLabel id="abilities">כישורים נדרשים</InputLabel>
                                        <Select
                                            labelId="abilities"
                                            id="abilities"
                                            multiple
                                            name="abilities"
                                            value={values.abilities}
                                            renderValue={(selected) => (
                                                <div>{(selected).map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}</div>
                                            )}
                                            MenuProps={MenuProps}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.abilities && touched.abilities}>
                                            {
                                                // console.log(abilitiesArr)&&
                                                abilitiesArr && abilitiesArr.map((ability, index) => (
                                                    <MenuItem onClick={() => { cancelGrade() }}
                                                        key={index} value={ability.name_req} >
                                                        <Checkbox onChange={(e) => {
                                                            if (e.target.checked)
                                                                setShownAbilities([...values.abilities, ability.name_req])
                                                            else
                                                                setShownAbilities(values.abilities.filter((a) => a != ability.name_req))
                                                        }} checked={values.abilities.indexOf(ability.name_req) != -1} />
                                                        <ListItemText primary={ability.name_req} />
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    {errors.abilities && touched.abilities && <Alert severity="error">{errors.abilities}</Alert>}
                                </Grid>

                                {(values.abilities.length != 0 || gradedAbilities.length != 0) &&
                                    <Grid>

                                        <FormLabel
                                            sx={{ p: 2, fontSize: '20px', color: 'deepPink', }}>
                                            דרג את עדיפותך ביכולות שבחרת
                                        </FormLabel>
                                        <Grid sx={{ p: 1 }} container direction='column'>
                                            <Grid container direction='row'>
                                                {shownAbilities.map((ability, index) => {
                                                    return (
                                                        <Button sx={{ color: '#02c298' }} id={index} key={index} onClick={(e) => addAbility(e)}>
                                                            {ability}
                                                        </Button>
                                                    )
                                                })}
                                                {gradedAbilities.length > 0 &&
                                                    <Button variant="outlined" color="error" onClick={cancelGrade}>בטל דירוג
                                                        <ClearIcon></ClearIcon>
                                                    </Button>}
                                            </Grid>
                                            <Grid container direction='column'>
                                                <ol>
                                                    {gradedAbilities.map((ability, index) => {
                                                        console.log('values: ' + index)
                                                        return (<li key={index}><Grid>{ability}</Grid></li>)
                                                    })}
                                                </ol>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                }
                                <Grid item sx={{
                                    // p: 2,
                                    margin: 'auto',
                                }}>


                                    <Grid container direction="row" sx={{
                                        p: 1
                                    }}>
                                        <Grid item sx={{
                                            p: 0,
                                            width: '20%'
                                        }}>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                name="genderScore"
                                                id="genderScore"
                                                label="ניקוד דרישה"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.genderScore && touched.genderScore} />
                                        </Grid>
                                        <Grid item sx={{
                                            p: 1,
                                            margin: 'auto',
                                            width: '80%'
                                        }}>
                                            <FormControl>
                                                <FormLabel>מין</FormLabel>
                                                <RadioGroup
                                                    name="id_gender"
                                                    id="id_gender"
                                                    value={values.id_gender}
                                                    onChange={handleChange}
                                                >{genders.map((item, i) => {
                                                    return <FormControlLabel key={i} value={item.id_gender} control={<Radio />} label={item.name_gender} />
                                                })}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" sx={{
                                        p: 1
                                    }}>
                                        <Grid item sx={{
                                            p: 0,
                                            margin: 'auto',
                                            width: '20%'
                                        }}>
                                            <TextField
                                                className="score"
                                                type="number"
                                                fullWidth
                                                name="ageScore"
                                                id="ageScore"
                                                label="ניקוד דרישה"
                                                variant="outlined"
                                                value={values.ageScore}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.ageScore && touched.ageScore}
                                            />
                                        </Grid>
                                        <Grid container direction="row" sx={{
                                            p: 1
                                        }}>
                                            <Grid item sx={{
                                                p: 0,
                                                width: '20%'
                                            }}>
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    name="genderScore"
                                                    id="genderScore"
                                                    label="ניקוד דרישה"
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.genderScore && touched.genderScore} />
                                            </Grid>
                                            <Grid item sx={{
                                                p: 2,
                                                margin: 'auto',
                                                width: '80%'
                                            }}>
                                                <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                                                    <InputLabel id="age_range">טווח גילאים נדרש</InputLabel>
                                                    <Select

                                                        labelId="age_range"
                                                        id="age_range"
                                                        name="age_range"
                                                        value={values.age_range}
                                                        label="age"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.age_range && touched.age_range}
                                                    >
                                                        {ages.map((item, i) => {
                                                            return <MenuItem key={i} value={item} className="menuItemAge">{item}</MenuItem>
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {errors.age_range && touched.age_range && <Alert severity="error">{errors.age_range}</Alert>}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" sx={{
                                            p: 1
                                        }}>
                                            <Grid item sx={{
                                                p: 0,
                                                margin: 'auto',
                                                width: '20%'
                                            }}>
                                                <TextField
                                                    className="score"
                                                    type="number"
                                                    fullWidth
                                                    name="experienceScore"
                                                    id="experienceScore"
                                                    label="ניקוד דרישה"
                                                    variant="outlined"
                                                    value={values.experienceScore}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.experienceScore && touched.experienceScore}
                                                />
                                            </Grid>
                                            <Grid item sx={{
                                                p: 2,
                                                margin: 'auto',
                                                width: '80%'
                                            }}>
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    name="seniority_range"
                                                    id="seniority_range"
                                                    label="מספר שנות ניסיון"
                                                    variant="standard"
                                                    value={values.seniority_range}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.seniority_range && touched.seniority_range}
                                                />
                                                {errors.seniority_range && touched.seniority_range && <Alert severity="error">{errors.seniority_range}</Alert>}
                                            </Grid>
                                        </Grid>

                                        <Grid item sx={{
                                            p: 2,
                                            margin: 'auto',
                                        }}>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                name="amount"
                                                id="amount"
                                                label="מספר עובדים נדרש"
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.amount && touched.amount}
                                            />
                                            {errors.amount && touched.amount && <Alert severity="error">{errors.amount}</Alert>}
                                        </Grid>

                                        <Grid item sx={{
                                            p: 1,
                                            margin: 'auto',
                                        }}>

                                            {/* {shownAbilities.length != 0&& <Alert severity="error">עליך לדרג את יכולותיך</Alert>} */}
                                            <Button
                                                sx={{ backgroundColor: 'deepPink' }}
                                                disabled={!dirty || !isValid || shownAbilities.length != 0}
                                                type="submit"
                                                variant="contained"
                                            >אישור</Button>
                                        </Grid >

                                    </Grid>
                                </Grid >
                            </Grid >
                        </Grid >
                    </form> :
                    <Grid>
                        אינך משתמש מורשה לכניסה הרשם בדף הבית !!
                    </Grid>
            }
        </div>
    );
}

export default EmployerDemands;