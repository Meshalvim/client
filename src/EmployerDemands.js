import { useState } from "react";
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, ListItemText, Checkbox, Chip, ListItemAvatar, Avatar, ListItem, Tooltip, IconButton } from "@mui/material";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, TouchAppRounded } from "@mui/icons-material";
import { number } from "yup/lib/locale";
import ClearIcon from '@mui/icons-material/Clear';

const validationSchema = Yup.object({
    // abilities: Yup.array().required('זהו שדה חובה'),
    disabilities: Yup.string().required('זהו שדה חובה'),
    gender: Yup.string().required('מין זהו שדה חובה'),
    age: Yup.string().required('זהו שדה חובה'),
    experience: Yup.number().min(0, 'לא יתכן מספר שלילי').required('זהו שדה חובה'),
    sumEmploeds: Yup.number().min(1, 'לפחות אחד').required('זהו שדה חובה'),
    positionType: Yup.string().required('זהו שדה חובה'),
    ageScore: Yup.number().min(1, 'הניקוד מתחיל מאחד').required('זהו שדה חובה'),
    experienceScore: Yup.number().min(1, 'הניקוד מתחיל מאחד').required('זהו שדה חובה'),
    genderScore: Yup.number().min(1, 'הניקוד מתחיל מאחד').required('זהו שדה חובה'),
});
const EmployerDemands = () => {
    // const navigate = useNavigate()
    const { handleBlur, handleChange, handleSubmit, errors, values, touched, isValid, dirty } = useFormik({
        initialValues: {
            abilities: [],
            disabilities: '',
            gender: '',
            age: '',
            experience: '',
            sumEmploeds: '',
            positionType: '',
            abilitiesScore: [],
            ageScore: '',
            experienceScore: '',
            genderScore: '',
        },
        validationSchema,
        onSubmit: (values) => {

            Swal.fire({
                title: '',
                text: 'הפרטים נקלטו בהצלחה!! המשך יום מוצלח!!! ',
                icon: 'success',
                confirmButtonText: 'המשך',
                confirmButtonColor: '#3085d6',
            })
        }
    });
    const ages = ["18 - 22", "23 - 28", "29 - 33", "34 - 38", "39 - 43", "44 - 48", "49 - 53", "54 - 60"];
    const abilitiesArr = ["פיזית", "מנטלית", "ריאלית", "תקשורתית", "מוטורית"];
    const abilities = [{ ability: "מוטורית", score: null }, { ability: "תקשורתית", score: null }, { ability: "ריאלית", score: null }, { ability: "מנטלית", score: null }, { ability: "פיזית", score: null }]
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
        <form onSubmit={handleSubmit} >
            <Grid container direction="column" sx={{
                p: 1
            }}>
                <Grid
                    sx={{
                        p: 1,
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
                    >דרישות מעסיק</FormLabel>

                    <Tooltip title="Clear" className="tooltip">
                        <IconButton>
                            <ClearIcon></ClearIcon>
                        </IconButton>
                    </Tooltip>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }} >
                            <InputLabel id="abilities">כישורים נדרשים</InputLabel>
                            <Select
                                labelId="abilities"
                                id="abilities"
                                multiple
                                name="abilities"
                                value={values.abilities}
                                // renderValue={(selected) => selected.join(', ')}
                                renderValue={(selected) => (
                                    <div>
                                        {(selected).map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.abilities && touched.abilities}
                            >
                                {abilitiesArr.map((obj, i) => (
                                    <MenuItem key={i} value={obj}>
                                        <Checkbox checked={values.abilities.indexOf(obj) != -1} />
                                        <ListItemText primary={obj} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.abilities && touched.abilities && <Alert severity="error">{errors.abilities}</Alert>}
                    </Grid>

                    <Grid>
                        {values.abilities.map((ability, index) => {
                            return (
                                <ListItem key={index} sx={{
                                    width: '10vw'
                                }}>
                                    <TextField
                                        type="number"
                                        name="genderScore"
                                        id="genderScore"
                                        label="ניקוד דרישה"
                                        variant="outlined"
                                    />
                                    <ListItemText
                                        sx={{ margin: '1vw' }}
                                        primary={ability}
                                    />
                                </ListItem>)
                        })}
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        {values.abilities.map((obj, i) => (
                            <TextField
                                key={i}
                                value={obj.score}
                                type="number"
                                fullWidth
                                name="ablScore"
                                id="ablScore"
                                label={obj.ability}
                                variant="standard"
                                value={values.abilities.score}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />))}
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="disabilities">סוגי מוגבלויות אפשריות</InputLabel>
                            <Select

                                labelId="disabilities"
                                id="disabilities"
                                value={values.disabilities}
                                label="disabilities"
                                name="disabilities"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.disabilities && touched.disabilities}
                            >
                                {abilitiesArr.map((abl, i) => {
                                    return <MenuItem key={i} value={abl}>{abl}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {errors.disabilities && touched.disabilities && <Alert severity="error">{errors.disabilities}</Alert>}
                    </Grid>

                    <Grid container direction="row" sx={{
                        p: 1
                    }}>
                        <Grid item sx={{
                            p: 1,
                            width: '20%'
                        }}>
                            <TextField
                                type="number"
                                fullWidth
                                name="genderScore"
                                id="genderScore"
                                label="ניקוד דרישה"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.genderScore && touched.genderScore} />
                            {errors.genderScore && touched.genderScore && <Alert severity="error">{errors.genderScore}</Alert>}
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
                                    onBlur={handleBlur}
                                    error={errors.gender}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="זכר" />
                                    <FormControlLabel value="female" control={<Radio />} label="נקבה" />
                                    <FormControlLabel value="both" control={<Radio />} label="לא משנה" />
                                </RadioGroup>
                            </FormControl>
                            {errors.gender && <Alert severity="error">{errors.gender}</Alert>}
                        </Grid>
                    </Grid>

                    <Grid container direction="row" sx={{
                        p: 1
                    }}>
                        <Grid item sx={{
                            p: 1,
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
                                variant="standard"
                                value={values.ageScore}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.ageScore && touched.ageScore}
                            />
                        </Grid>
                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                            width: '80%'
                        }}>
                            <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                            p: 1,
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
                                variant="standard"
                                value={values.experienceScore}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.experienceScore && touched.experienceScore}
                            />
                            {errors.experienceScore && touched.experienceScore && <Alert severity="error">{errors.experienceScore}</Alert>}
                        </Grid>
                        <Grid item sx={{
                            p: 1,
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
                        p: 1,
                        margin: 'auto',
                    }}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                        p: 1,
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

                        {!errors.age && !errors.abilities
                            && !errors.disabilities && !errors.experience
                            && !errors.sumEmploeds && !errors.positionType
                            && !errors.positionType && !errors.ageScore
                            && !errors.experienceScore && !errors.genderScore
                            && errors.gender
                            && <Alert severity="error">{errors.gender}</Alert>}

                        <Button
                            disabled={!dirty || !isValid}
                            type="submit"
                            variant="contained"
                        >אישור</Button>
                    </Grid >

                </Grid>
            </Grid >
        </form>
    );
}

export default EmployerDemands;