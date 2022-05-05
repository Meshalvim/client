import { Backdrop, CircularProgress, Button, Grid } from "@mui/material";
import { useState } from "react";

const Manager = () => {
    const [showBackdrop, setShowBackdrop] = useState(false)

    const algorithm = () => {
        setShowBackdrop(true)
        console.log('start ' + showBackdrop)
        getRiverInformation().then(
            d => setShowBackdrop(d)
        )
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