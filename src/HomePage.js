import SvgIcon from '@mui/icons-material/VolunteerActivism';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import { Grid, Button } from '@mui/material'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <>
            <Grid container direction='row'>
                <Grid item>
                    {/* here is a logo or an image */}
                </Grid>
                <Grid container direction='column'>
                    <Button variant="contained" size="large">
                        מעסיק
                    </Button>
                    <Button variant="contained" size="large">
                        מחפש עבודה
                    </Button>
                    <Button variant="contained" size="large">
                        מנהל המערכת
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;