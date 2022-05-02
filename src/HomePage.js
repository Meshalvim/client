import SvgIcon from '@mui/icons-material/VolunteerActivism';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import { Grid, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <>
            <Grid container direction='row'>
                <Grid item>
                    <Box sx={{ width: '50vw', height: '20vw' }}></Box>
                    {/* here is a logo or an image */}
                </Grid>
                <Grid item sx={{margin:'auto'}}>
                    <Grid container direction='column'>
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={()=>navigate('/signIn')} 
                            sx={{
                            p: 2,
                            margin: 2,
                            }}>
                            מעסיק
                    </Button>
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={()=>navigate('/signIn')} 
                            sx={{
                            p: 2,
                            margin: 2,
                        }}>
                            מחפש עבודה
                    </Button>
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={()=>navigate('/manage')} 
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