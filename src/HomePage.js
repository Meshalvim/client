import { Grid, Button, Box, SvgIcon, CardActionArea, Typography, Card, CardMedia, CardContent } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import HearingDisabledRoundedIcon from '@mui/icons-material/HearingDisabledRounded';
import AccessibleRoundedIcon from '@mui/icons-material/AccessibleRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const HomePage = () => {

    const navigate = useNavigate();
    const buttonStyle = {
        p: 2,
        margin: 2,
        backgroundColor: '#02c298',
        '&:hover': {
            backgroundColor: '#009f7c'
        }
    }

    return (
        <>

            <Grid container direction='column' sx={{ margin: 'auto' }}>
                <Grid container direction='row' justifyContent='center'>
                    <SvgIcon sx={{ p: 2, m: 6 }} style={{ borderRadius: '50%', backgroundColor: 'lightGrey', fontSize: '15vw', color: 'White' }} component={HearingDisabledRoundedIcon} inheritViewBox />
                    <SvgIcon sx={{ p: 2, m: 6 }} style={{ borderRadius: '50%', backgroundColor: 'lightGrey', fontSize: '15vw', color: 'White' }} component={AccessibleRoundedIcon} inheritViewBox />
                    <SvgIcon sx={{ p: 2, m: 6 }} style={{ borderRadius: '50%', backgroundColor: 'lightGrey', fontSize: '15vw', color: 'White' }} component={VisibilityOffRoundedIcon} inheritViewBox />
                </Grid>
                <Grid item container direction='row' justifyContent='space-around'>
                    <Grid item container style={{width:'50vw', }}>
                        <img src={require('./images/logo.png')} width='100%' style={{opacity:0.5}}/>
                    </Grid>
                    <Grid item container direction='column' width='15vw'>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                localStorage.setItem('status', 'employer');
                                navigate('/SignInEmployer')
                            }}
                            sx={buttonStyle}>
                            מעסיק
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                localStorage.setItem('status', 'candidate');
                                navigate('/signInWorker')
                            }}
                            sx={buttonStyle}>
                            מחפש עבודה
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                localStorage.setItem('status', "manager");
                                navigate('/manager')
                            }}
                            sx={buttonStyle}>
                            מנהל המערכת
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='center'>
                    <Card sx={{ maxWidth: 300, m: 'auto', mb: 3 }}>
                        <CardActionArea>
                            <Grid container direction='row'>

                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={require('./images/5r.jpg')}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        הי
                            </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        תודה על ההשתתפות במיזם החדש מקווים שתפיקו את המירב!!!
                            </Typography>
                                </CardContent>

                            </Grid>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: 600, m: 'auto', mb: 3 }}>
                        <CardActionArea>
                            <Grid container direction='row'>

                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={require('./images/5.jpg')}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        הי
                            </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        תודה על ההשתתפות במיזם החדש מקווים שתפיקו את המירב!!!
                            </Typography>
                                </CardContent>

                            </Grid>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: 300, m: 'auto', mb: 3 }}>
                        <CardActionArea>
                            <Grid container direction='row'>

                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={require('./images/5l.jpg')}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        הי
                            </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        תודה על ההשתתפות במיזם החדש מקווים שתפיקו את המירב!!!
                            </Typography>
                                </CardContent>

                            </Grid>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;