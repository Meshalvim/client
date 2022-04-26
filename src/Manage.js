import { Backdrop, CircularProgress, Button } from "@mui/material";
import { useState } from "react";

const Manage = () => {
    const [showBackdrop, setShowBackdrop] = useState(false)

    const algorithm = () => {
        setShowBackdrop(true)
        console.log('start '+showBackdrop)
        
    }


    return (
        <>
            <Button variant="contained" color="success"
                onClick={() => { algorithm() }}
            >
                  ... לשיבוץ עובדים על פי הנתונים שנשמרו 
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showBackdrop}
            >
                <CircularProgress color="inherit"/>
                <h1 width='100vw'>  ...אנא המתן</h1>
            </Backdrop>
        </>
    );
}

export default Manage;