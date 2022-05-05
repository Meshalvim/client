import { Grid, Button, Box, SvgIcon } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import HearingDisabledRoundedIcon from '@mui/icons-material/HearingDisabledRounded';
import AccessibleRoundedIcon from '@mui/icons-material/AccessibleRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <>

            <Grid container direction='column' sx={{margin:'auto'}}>
                <Grid container direction='row' justifyContent='center'>
                    <SvgIcon sx={{ p: 2, m:6 }} style={{ borderRadius: '50%', backgroundColor: 'lightGrey', fontSize: '15vw', color: 'White'}} component={HearingDisabledRoundedIcon} inheritViewBox />
                    <SvgIcon sx={{ p: 2, m:6 }} style={{ borderRadius: '50%', backgroundColor: 'lightGrey', fontSize: '15vw', color: 'White'}} component={AccessibleRoundedIcon} inheritViewBox />
                    <SvgIcon sx={{ p: 2, m:6 }} style={{ borderRadius: '50%', backgroundColor: 'lightGrey', fontSize: '15vw', color: 'White' }} component={VisibilityOffRoundedIcon} inheritViewBox />
                </Grid>
                <Grid item sx={{ margin: 'auto' }}>
                    <Grid container direction='column'>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                localStorage.setItem('status', "employer");
                                navigate('/SignInEmployer')
                            }}
                            sx={{
                                p: 2,
                                margin: 2,
                            }}>
                            מעסיק
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                localStorage.setItem('status', "worker");
                                navigate('/signInWorker')
                            }}
                            sx={{
                                p: 2,
                                margin: 2,
                            }}>
                            מחפש עבודה
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                localStorage.setItem('status', "manager");
                                navigate('/managerLogin')
                            }}
                            sx={{
                                p: 2,
                                margin: 2,
                            }}>
                            מנהל המערכת
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;