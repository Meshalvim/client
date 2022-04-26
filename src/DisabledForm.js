import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { useState } from "react";
import swal from "sweetalert2";

const DisabledForm = () => {

    const [city, setCity] = useState();
    const [status, setStatus] = useState('');
    const [workingTime, setWorkingTime] = useState('');

    const handleRadioChangeStatus = (e) => {
        setStatus(e.target.value);
    }
    const handleRadioChangeWorkingTime = (e) => {
        setWorkingTime(e.target.value);
    }



    const handleChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <>
            <Grid container direction="column" sx={{
                p: 3,
            }}>
                <Grid
                    sx={{
                        p: 3,
                        border: '2px solid lightGrey',
                        borderRadius: '1vw',
                        margin: 'auto',
                        width: '50vw'

                    }}>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField fullWidth name="fName" id="fName" label="שם פרטי" variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField fullWidth name="lName" id="lName" label="שם משפחה" variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField
                            fullWidth
                            // pattern=/^[0-9]/
                            name="tel" type="text" id="tel" label="טלפון" variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField fullWidth name="email" type="אימייל" id="email" label="email" variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">עיר מגורים</InputLabel>
                            <Select

                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={city}
                                onChange={handleChange}
                                label="Age"
                            >
                                <MenuItem value="">
                                    {/* <em>None</em> */}
                                </MenuItem>
                                <MenuItem value={'Jerusalem'}>ירושלים</MenuItem>
                                <MenuItem value={'TelAviv'}>תל אביב</MenuItem>
                                <MenuItem value={'BneBrak'}>בני ברק</MenuItem>
                            </Select>
                        </FormControl>

                        <Grid item sx={{
                            p: 2,
                            margin: 'auto',
                        }}>
                            <FormControl>
                                <FormLabel>מין</FormLabel>
                                <RadioGroup
                                    name="controlled-radio-buttons-group"
                                    value={status}
                                    onChange={handleRadioChangeStatus}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="זכר" />
                                    <FormControlLabel value="female" control={<Radio />} label="נקבה" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item sx={{
                            p: 2,
                            margin: 'auto',
                        }}>
                            <FormControl>
                                <FormLabel>היקף משרה רצוי</FormLabel>
                                <RadioGroup
                                    name="controlled-radio-buttons-group"
                                    value={workingTime}
                                    onChange={handleRadioChangeWorkingTime}
                                >
                                    <FormControlLabel value="full" control={<Radio />} label="משרה מלאה" />
                                    <FormControlLabel value="mornning" control={<Radio />} label="בוקר" />
                                    <FormControlLabel value="afternoon" control={<Radio />} label="אחרי צהריים" />
                                    <FormControlLabel value="evening" control={<Radio />} label="ערב" />
                                    <FormControlLabel value="shifts" control={<Radio />} label="משמרות" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

 <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                   new swal({
                                        title: 'תודה שהשתתפת במיזם!',
                                        icon: 'success',
                                        text:'פרטיך נקלטו בהצלחה במערכת!!!',
                                        confirmButtonText: 'המשך',
                                        confirmButtonColor: '#3085d6',
                                    })
                                }}

                            >שמור</Button>
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default DisabledForm;