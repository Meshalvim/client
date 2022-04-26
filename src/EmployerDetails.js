import { Grid, TextField, FormLabel, Button } from "@mui/material";
import Swal from "sweetalert2"
import { useState } from "react";

const EmployerDetails = () => {

    const [name, setName] = useState('')

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
                        width:'50vw'

                    }}>

                    <FormLabel
                        sx={{
                            fontSize: '20px',
                            color: '#1976d2',
                        }}
                    >פרטי מעסיק</FormLabel>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField fullWidth name="name" id="name" label="שם העסק" variant="standard" />
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
                        <TextField fullWidth name="email" type="email" id="email" label="email" variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <TextField fullWidth name="password" id="password" type="password" label="סיסמא" variant="standard" />
                    </Grid>

                    <Grid item sx={{
                        p: 1,
                        margin: 'auto',
                    }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                Swal.fire({
                                    title:'!!!שים לב',
                                    text: 'כעת עליך למלא את הטופס על פי הדרישות על מנת שהתוצאה תצא מושלמת השתדל לדייק בנתונים ככל האפשר' ,
                                    icon: 'info',
                                    confirmButtonText: 'המשך',
                                    confirmButtonColor: '#3085d6',
                                })
                            }}

                        >להמשך התהליך</Button>
                    </Grid >
                </Grid>
            </Grid >
        </>
    );
}

export default EmployerDetails;
