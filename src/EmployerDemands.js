import { useState } from "react";
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const EmployerDemands = () => {
    const formik=useFormik({
        initialValues:{
            abilities:'',
            disabilities:'',
            gender:'',
            age:Number,
            experience:Number,
            positionType:'',
            sumEmploeds:Number,
        },
        onSubmit:values=>{
            alert(JSON.stringify(values,null,2))
        }
    })
    //אולי צריך להפוך לרשימת יכולות
    const [abilities, setAbilities] = useState();
    const [status, setStatus] = useState('');
    const [disabilities, setDisabilities] = useState();
    const [age, setAge] = useState();
    const [positionType, setPositionType] = useState();

    const handleChangeAbilities = (e) => {
        setAbilities(e.target.value);
    };

    const handleRadioChangeStatus = (e) => {
        setStatus(e.target.value);
    }
    const handleChangeDisabilities = (e) => {
        setDisabilities(e.target.value);
    }

    const ages = ["18 - 22", "23 - 28", "29 - 33", "34 - 38", "39 - 43", "44 - 48", "49 - 53", "54 - 60"];

    const navigate = useNavigate()
    return (
        <>
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
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="abilities">כישורים נדרשים</InputLabel>
                            <Select

                                labelId="abilities"
                                id="abilities"
                                value={abilities}
                                onChange={handleChangeAbilities}
                                label="abilities"
                            >
                                <MenuItem value={'physically'}>פיזית</MenuItem>
                                <MenuItem value={'Mentally'}>מנטלית</MenuItem>
                                <MenuItem value={'Realistic'}>ריאלית</MenuItem>
                                <MenuItem value={'Communicative'}>תקשורתית</MenuItem>
                                <MenuItem value={'Motor'}>מוטורית</MenuItem>

                            </Select>
                        </FormControl>
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
                                value={disabilities}
                                onChange={handleChangeDisabilities}
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
                                fullWidth name="experience"
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
                                    value={status}
                                    onChange={handleRadioChangeStatus}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="זכר" />
                                    <FormControlLabel value="female" control={<Radio />} label="נקבה" />
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
                                fullWidth name="experience"
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
                                    value={age}
                                    onChange={handleChangeDisabilities}
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
                                fullWidth name="experience"
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
                                fullWidth name="experience"
                                id="experience"
                                label="מספר שנות ניסיון"
                                variant="standard" />
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
                                value={positionType}
                                onChange={handleChangeDisabilities}
                                label="positionType"
                            >
                                <MenuItem value={'physically'}>משרה מלאה</MenuItem>
                                <MenuItem value={'Mentally'}>בוקר</MenuItem>
                                <MenuItem value={'Realistic'}>אחה"צ</MenuItem>
                                <MenuItem value={'Communicative'}>ערב</MenuItem>
                                <MenuItem value={'Motor'}>משמרות</MenuItem>
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
                            variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                Swal.fire({
                                    title: '',
                                    text: 'הפרטים נקלטו בהצלחה!! המשך יום מוצלח!!! ',
                                    icon: 'success',
                                    confirmButtonText: 'המשך',
                                    confirmButtonColor: '#3085d6',
                                })
                            }}
                        >אישור</Button>
                    </Grid >

                </Grid>
            </Grid >
        </>
    );
}

export default EmployerDemands;