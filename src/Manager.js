import { Backdrop, CircularProgress, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const Manager = () => {
    const navigate=useNavigate()
    const [showBackdrop, setShowBackdrop] = useState(false)

    const algorithm = () => {
        setShowBackdrop(true)
        console.log('start ' + showBackdrop)
        getRiverInformation().then(
            d => setShowBackdrop(d)
        ).then(()=>{navigate('../scheduling')})
    }


    const getRiverInformation = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(false)
            }, 10000)
        })
    }

    return (
        <>
            <Grid
                sx={{
                    p: 4,
                    margin: 'auto',
                    width: '20vw',
                }}>
                <Button variant="contained" color="success"
                    onClick={() => { algorithm() }}
                >
                    לשיבוץ עובדים על פי הנתונים שנשמרו ...
                </Button>
            </Grid>
            <Backdrop

                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showBackdrop}
            >
                <CircularProgress color="inherit" />
                <h1 width='100vw'>  ...אנא המתן</h1>
            </Backdrop>
        </>
    );
}

export default Manager;