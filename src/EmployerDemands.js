import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, ListItemText, Checkbox, Chip, ListItem, Tooltip, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import HomePage from './HomePage'

const validationSchema = Yup.object({
    abilities: Yup.array().min(1, 'זהו שדה חובה'),
    age: Yup.string().required('זהו שדה חובה'),
    experience: Yup.number().min(0, 'לא יתכן מספר שלילי').required('זהו שדה חובה'),
    sumEmploeds: Yup.number().min(1, 'לפחות אחד').required('זהו שדה חובה'),
    positionType: Yup.string().required('זהו שדה חובה'),
    ageScore: Yup.number().min(10, 'הניקוד מתחיל מעשר').required('זהו שדה חובה'),
    //צריך להוסיף בניקוד בדיקה האם המספר מתחלק ב 10
    // .matches(/[*]+0$/, 'על המספר להתחלק באפס')
    experienceScore: Yup.number().min(10, 'הניקוד מתחיל מעשר').required('זהו שדה חובה'),
    genderScore: Yup.number().min(10, 'הניקוד מתחיל מעשר').required('זהו שדה חובה'),
});
const EmployerDemands = () => {
    const navigate = useNavigate()
    const { handleBlur, handleChange, handleSubmit, errors, values, touched, isValid, dirty } = useFormik({
        initialValues: {
            abilities: [],
            gender: '',
            age: '',
            experience: '',
            sumEmploeds: '',
            positionType: '',
            ageScore: '',
            experienceScore: '',
            genderScore: '',
        },
        validationSchema,
        onSubmit: (values) => {
            //gradedAbilities וכן את values צריך לשלוח את   
            // values.abilities ב gradedAbilities ניתן לשים את)
            //( values ואז לא יצטרכו לשלוח עוד משהו חוץ מ 
            swal.fire({
                title: '',
                text: 'הפרטים נקלטו בהצלחה!! המשך יום מוצלח!!! ',
                icon: 'success',
                confirmButtonText: 'חזרה לדף הבית',
                confirmButtonColor: '#3085d6',
            }).then(() => { navigate('/') })
        }
    });

    const [gradedAbilities, setGradedAbilities] = useState([])
    const [shownAbilities, setShownAbilities] = useState(values.abilities)

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

    const ages = ["18 - 22", "23 - 28", "29 - 33", "34 - 38", "39 - 43", "44 - 48", "49 - 53", "54 - 60"];
    const abilitiesArr = ["פיזית", "מנטלית", "ריאלית", "תקשורתית", "מוטורית"];
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
                                            {abilitiesArr.map((ability, index) => (
                                                <MenuItem onClick={() => { cancelGrade() }}
                                                    key={index} value={ability} >
                                                    <Checkbox onChange={(e) => {
                                                        if (e.target.checked)
                                                            setShownAbilities([...values.abilities, ability])
                                                        else
                                                            setShownAbilities(values.abilities.filter((a) => a != ability))
                                                    }} checked={values.abilities.indexOf(ability) != -1} />
                                                    <ListItemText primary={ability} />
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
                                                        <Button sx={{color:'#1c8ab2'}} id={index} key={index} onClick={(e) => addAbility(e)}>
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
                                                    name="gender"
                                                    id="gender"
                                                    value={values.gender}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="male" control={<Radio />} label="זכר" />
                                                    <FormControlLabel value="female" control={<Radio />} label="נקבה" />
                                                    <FormControlLabel value="both" control={<Radio />} label="לא משנה" />
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
                                                <InputLabel id="age">טווח גילאים נדרש</InputLabel>
                                                <Select

                                                    labelId="age"
                                                    id="age"
                                                    name="age"
                                                    value={values.age}
                                                    label="age"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.age && touched.age}
                                                >
                                                    {ages.map((item, i) => {
                                                        return <MenuItem key={i} value={item} className="menuItemAge">{item}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                            {errors.age && touched.age && <Alert severity="error">{errors.age}</Alert>}
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
                                    </Grid>

                                    <Grid item sx={{
                                        p: 2,
                                        margin: 'auto',
                                    }}>
                                        <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                                            <InputLabel id="positionType">היקף משרה</InputLabel>
                                            <Select
                                                labelId="positionType"
                                                id="positionType"
                                                value={values.positionType}
                                                label="positionType"
                                                name="positionType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.positionType && touched.positionType}
                                            >
                                                <MenuItem value={'full'}>משרה מלאה</MenuItem>
                                                <MenuItem value={'morning'}>בוקר</MenuItem>
                                                <MenuItem value={'afternoon'}>אחה"צ</MenuItem>
                                                <MenuItem value={'evening'}>ערב</MenuItem>
                                                <MenuItem value={'shifts'}>משמרות</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.positionType && touched.positionType && <Alert severity="error">{errors.positionType}</Alert>}
                                    </Grid>

                                    <Grid item sx={{
                                        p: 2,
                                        margin: 'auto',
                                    }}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            name="sumEmploeds"
                                            id="sumEmploeds"
                                            label="מספר עובדים נדרש"
                                            variant="standard"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.sumEmploeds && touched.sumEmploeds}
                                        />
                                        {errors.sumEmploeds && touched.sumEmploeds && <Alert severity="error">{errors.sumEmploeds}</Alert>}
                                    </Grid>

                                    <Grid item sx={{
                                        p: 1,
                                        margin: 'auto',
                                    }}>

                                        {/* {shownAbilities.length != 0&& <Alert severity="error">עליך לדרג את יכולותיך</Alert>} */}
                                        <Button
                                            sx={{backgroundColor:'deepPink'}}
                                            disabled={!dirty || !isValid || shownAbilities.length != 0}
                                            type="submit"
                                            variant="contained"
                                        >אישור</Button>
                                    </Grid >

                                </Grid>
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