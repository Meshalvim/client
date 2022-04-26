import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, CardHeader, Alert } from '@mui/material';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';

const SignIn = () => {

    const [status, setStatus] = useState('lookingForJob');
    const [name, setName] = useState('')

    const handleRadioChange = (event) => {
        setStatus(event.target.value);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" sx={{ p: 5 }}>
                {JSON.stringify(errors)}
                <Grid item sx={{
                    p: 1,
                    margin: 'auto',
                    width:'50vw'

                }}>
                    <Grid
                        sx={{
                            p: 4,
                            border: '2px solid lightGrey',
                            borderRadius: '1vw',
                            margin: 'auto',
                        }}>

                        <FormLabel
                            sx={{
                                fontSize: '20px',
                                color: '#1976d2',
                            }}
                        >הרשמה</FormLabel>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField fullWidth name="name" id="name" label="שם" variant="standard" onChange={(e) => setName(e.target.value)} />
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField fullWidth id="password" type="password" label="סיסמא" variant="standard" />
                        </Grid>

                        <Grid item sx={{
                            p: 1,
                            margin: 'auto',
                        }}>
                            <TextField
                                fullWidth
                                {...register("email", {
                                    pattern: { value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message: 'Please enter a valid email' }
                                })}
                                id="email" type="email" label="אימייל" variant="standard"
                            />
                            {/* <Alert severity="error">בתבנית אימייל!!!</Alert> */}
                            {errors.email && <Alert severity="error">בתבנית אימייל!!!</Alert>}
                        </Grid>

                        <Grid item sx={{
                            p: 2,
                            margin: 'auto',
                        }}>
                            <FormControl>
                                <FormLabel>סמן סטטוס</FormLabel>
                                <RadioGroup
                                    name="controlled-radio-buttons-group"
                                    value={status}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value="employer" control={<Radio />} label="מעסיק" />
                                    <FormControlLabel value="lookingForJob" control={<Radio />} label="מחפש עבודה" />
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
                                        title: '!!!' + ' שלום ' + name,
                                        icon: 'success',
                                        text: '!!! פרטיך נקלטו בהצלחה במערכת',
                                        confirmButtonText: 'המשך',
                                        confirmButtonColor: '#3085d6',
                                    })
                                }}

                            >להרשמה</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default SignIn;