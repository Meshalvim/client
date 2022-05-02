import { useState } from "react";
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Alert, ListItemText, Checkbox } from "@mui/material";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, TouchAppRounded } from "@mui/icons-material";

const validationSchema = Yup.object({
    experience: Yup.number().min(0, 'לא יתכן מספר שלילי').required('נסיון זהו שדה חובה'),
    sumEmploeds: Yup.number().min(1, 'לפחות אחד').required('מספר עובדים זהו שדה חובה'),

});
const EmployerDemands = () => {
    const { handleBlur, handleChange, handleSubmit, errors, values, touched, isValid, dirty } = useFormik({
        initialValues: {
            abilities: [],
            disabilities: '',
            gender: '',
            age: '',
            experience: '',
            positionType: '',
            sumEmploeds: '',
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
    const abilitiesArr=["פיזית","מנטלית","ריאלית","תקשורתית","מוטורית"];
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
    const navigate = useNavigate()
    return (
        <form onSubmit={handleSubmit} >
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
                    >דרישות מעסיק</FormLabel>

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
                                value={values.abilities}
                                onChange={handleChange}
                               // input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {abilitiesArr.map((abl,i) => (
                                    <MenuItem key={i} value={abl}>
                                        <Checkbox checked={values.abilities.indexOf(abl) > -1} />
                                        <ListItemText primary={abl} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>



                        {/* <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="abilities">כישורים נדרשים</InputLabel>
                            <Select

                                labelId="abilities"
                                id="abilities"
                                value={values.abilities}
                                onChange={handleChange}
                                label="abilities"
                            >
                                <MenuItem value={'physically'}>פיזית</MenuItem>
                                <MenuItem value={'Mentally'}>מנטלית</MenuItem>
                                <MenuItem value={'Realistic'}>ריאלית</MenuItem>
                                <MenuItem value={'Communicative'}>תקשורתית</MenuItem>
                                <MenuItem value={'Motor'}>מוטורית</MenuItem>

                            </Select>
                        </FormControl> */}
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
                                onChange={handleChange}
                                label="disabilities"
                            >
                                <MenuItem value={'physically'}>פיזית</MenuItem>
                                <MenuItem value={'Mentally'}>מנטלית</MenuItem>
                                <MenuItem value={'Realistic'}>ריאלית</MenuItem>
                                <MenuItem value={'Communicative'}>תקשורתית</MenuItem>
                                <MenuItem value={'Motor'}>מוטורית</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid container direction="row" sx={{
                        p: 5
                    }}>
                        <Grid item sx={{
                            p: 1,
                            width: '20%'
                        }}>
                            <TextField
                                type="number"
                                fullWidth
                                name=""
                                id="score"
                                label="ניקוד דרישה"
                                variant="standard" />
                        </Grid>
                        <Grid item sx={{
                            p: 4,
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
                        p: 5
                    }}>
                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                            width: '20%'
                        }}>
                            <TextField
                                className="score"
                                type="number"
                                fullWidth name=""
                                id="score"
                                label="ניקוד דרישה"
                                variant="standard"
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
                                    value={values.age}
                                    onChange={handleChange}
                                    label="age"
                                >
                                    {ages.map((item, i) => {
                                        return <MenuItem key={i} value={item} className="menuItemAge">{item}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" sx={{
                        p: 5
                    }}>
                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                            width: '20%'
                        }}>
                            <TextField
                                className="score"
                                type="number"
                                fullWidth name=""
                                id="score"
                                label="ניקוד דרישה"
                                variant="standard" />
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
                            // value={values.experience}
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
                                onChange={handleChange}
                                label="positionType"
                            >
                                <MenuItem value={'full'}>משרה מלאה</MenuItem>
                                <MenuItem value={'morning'}>בוקר</MenuItem>
                                <MenuItem value={'afternoon'}>אחה"צ</MenuItem>
                                <MenuItem value={'evening'}>ערב</MenuItem>
                                <MenuItem value={'shifts'}>משמרות</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            type="number"
                            fullWidth name="sumEmploeds"
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