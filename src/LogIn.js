import { Grid, TextField, FormLabel, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useState } from "react";

const LogIn = () => {

    const [name, setName]= useState('')

    return (
        <Grid container direction="column" sx={{
            p: 5,
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
                >כניסה</FormLabel>

                <Grid item sx={{
                    p: 1,
                    margin: 'auto',
                }}>
                    <TextField fullWidth name="name" id="name" label="שם" variant="standard" 
                        onChange={(e)=>setName(e.target.value)}/>
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
                    <Button
                        variant="contained"
                        onClick={() => {

                            Swal.fire({
                                title: '!!!' + ' שלום ' + name,
                                icon: 'info',
                                text: '!!!אתה מועבר לטופס לבקשת עבודה, בהצלחה',
                                confirmButtonText: 'המשך',
                                confirmButtonColor: '#3085d6',
                            })

                        }}

                    >לכניסה</Button>
                </Grid>

            </Grid>
        </Grid>
    );
}

export default LogIn;