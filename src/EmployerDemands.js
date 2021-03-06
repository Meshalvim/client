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
    // abilities: Yup.array().min(1, 'זהו שדה חובה'),
    age_range: Yup.string().required('זהו שדה חובה'),
    seniority_range: Yup.string().required('זהו שדה חובה'),
    amount: Yup.number().min(1, 'לפחות אחד').required('זהו שדה חובה'),
    ageScore: Yup.number().min(0, 'הניקוד גדול מאפס').required('זהו שדה חובה'),
    experienceScore: Yup.number().min(0, 'הניקוד גדול מאפס').required('זהו שדה חובה'),
    genderScore: Yup.number().min(0, 'הניקוד גדול מאפס').required('זהו שדה חובה'),
});
const EmployerDemands = () => {

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, isValid, dirty } = useFormik({
        initialValues: {
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
            debugger
            let sendAbilities = [];
            //int id_req_to_job, int id_job, int id_requirment, double score)
            for (let i = 0; i < abilities.length; i++) {
                sendAbilities.push({
                    id_requirment: abilities[i].id_req,
                    score: i + 1
                })
            }
            const send = {
                Company: {
                    password_company: JSON.parse(localStorage.getItem('user')).Company.password_company,
                    name_company: JSON.parse(localStorage.getItem('user')).Company.name_company
                },
                Job: {
                    //id_company in the C#
                    id_city: JSON.parse(localStorage.getItem('user')).Job.id_city,
                    age_range: values.age_range,
                    seniority_range: values.seniority_range,
                    id_gender: values.id_gender,
                    amount: values.amount,
                },
                scoreOfJob:
                {
                    score_gender: values.genderScore,
                    score_age: values.ageScore,
                    score_seniority: values.experienceScore,
                },
                requires: [...sendAbilities]

            }
            axios.post(url, send).then(result => {
                console.log(result)
                if (result.status == true) {
                    let data = result.data.data
                    console.log(data)
                    swal.fire({
                        title: '',
                        text: 'הפרטים נקלטו בהצלחה!! המשך יום מוצלח!!! ',
                        icon: 'success',
                        confirmButtonText: 'חזרה לדף הבית',
                        confirmButtonColor: '#3085d6',
                    }).then(() => {
                        localStorage.setItem('user', JSON.stringify(data))
                        navigate('/')
                    })
                }
                else {
                    swal.fire({
                        title: '',
                        icon: 'error',
                        text: result.message,
                        confirmButtonText: 'חזרה לדף הבית',
                        showCancelButton: true,
                        cancelButtonText: 'לניסיון חוזר',
                        confirmButtonClass: 'btn-danger',
                        cancelButtonClass: 'btn-danger',
                        confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/')
                        }
                    })
                }
            })
        }
    });

    const ages = ["18 - 22", "23 - 28", "29 - 33", "34 - 38", "39 - 43", "44 - 48", "49 - 53", "54 - 60"];
    const seniority = ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30", "30+"]
    const navigate = useNavigate()
    const [abilities, setAbilities] = useState([])
    const [shownAbilities, setShownAbilities] = useState()
    const [genders, setGenders] = useState([])
    // const [gradedAbilities, setGradedAbilities] = useState([])
    // const [shownAbilities, setShownAbilities] = useState(values.abilities)
    // const [abilitiesArr, setAbilitiesArr] = useState([])
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
        let c;
        axios.get(urlGender).then(res => {
            debugger;
            setGenders(res.data.data)
        })
    }, [2])

    useEffect(() => {
        let c;
        axios.get(uri).then(res => {
            if (!shownAbilities)
                //id_req name_req
                setShownAbilities(res.data.data)
        })
    });

    const addAbility = (ability, e) => {
        setAbilities([...abilities, ability])
        let a = shownAbilities.slice(0, e.target.id)
        let b = shownAbilities.slice(parseInt(e.target.id) + 1, shownAbilities.length)
        setShownAbilities(
            [...b, ...a])
    }
    const cancelGrade = () => {
        setShownAbilities([...abilities, ...shownAbilities])
        console.log(shownAbilities)
        setAbilities([])
    }

    // const addAbility = (e) => {
    //     setGradedAbilities([...gradedAbilities, e.target.outerText])
    //     let a = shownAbilities.slice(0, e.target.id)
    //     let b = shownAbilities.slice(parseInt(e.target.id) + 1, shownAbilities.length)
    //     setShownAbilities([...b, ...a])
    // }
    // const cancelGrade = () => {
    //     debugger
    //     setShownAbilities([...values.abilities])
    //     setGradedAbilities([])
    // }
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






                                {/* <Grid item sx={{
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
                                                <div>{(selected).map((value, index) => {
                                                    return (<Chip key={index} label={value} />)
                                                })}</div>
                                            )}
                                            MenuProps={MenuProps}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.abilities && touched.abilities}>
                                            {
                                                // console.log(abilitiesArr)
                                                abilitiesArr && abilitiesArr.map((ability, index) => {
                                                    debugger
                                                    return (<MenuItem onClick={() => { cancelGrade() }}
                                                        key={index} value={ability.name_req} >
                                                        <Checkbox onChange={(e) => {
                                                            debugger
                                                            if (e.target.checked) {
                                                                console.log("add " + JSON.stringify(shownAbilities))
                                                                debugger
                                                                setShownAbilities([...values.abilities, ability.name_req])
                                                            }
                                                            else {
                                                                debugger
                                                                console.log("less " + shownAbilities)
                                                                setShownAbilities(values.abilities.filter((a) => a != ability))
                                                            }
                                                        }} checked={values.abilities.indexOf(ability) != -1} />
                                                        <ListItemText primary={ability} />
                                                    </MenuItem>)
                                                })}
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
                                                        //console.log('values: ' + index)
                                                        return (<li key={index}><Grid>{ability}</Grid></li>)
                                                    })}
                                                </ol>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                } */}

                                <Grid item sx={{
                                    p: 2,
                                    margin: 'auto',
                                }}>

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
                                                <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                                                    <InputLabel id="seniority_range">מספר שנות ניסיון</InputLabel>
                                                    <Select
                                                        labelId="seniority_range"
                                                        id="seniority_range"
                                                        name="seniority_range"
                                                        value={values.seniority_range}
                                                        label="age"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.seniority_range && touched.seniority_range}
                                                    >
                                                        {seniority.map((item, i) => {
                                                            return <MenuItem key={i} value={item} className="menuItemAge">{item}</MenuItem>
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {errors.seniority_range && touched.seniority_range && <Alert severity="error">{errors.seniority_range}</Alert>}
                                            </Grid>
                                        </Grid>

                                            <Grid item sx={{
                                                p: 2,
                                                margin: 'auto',
                                                width: '100%',
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
                                                type="submit"
                                                sx={{ backgroundColor: 'deepPink' }}
                                                disabled={!dirty || !isValid}
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
