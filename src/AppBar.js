import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {useLocation} from 'react-router-dom';
// import lg from '../public/logo'

// const pages = [];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [currUser, setCurUser] = React.useState(JSON.parse(localStorage.getItem('user')))

    const navigate = useNavigate()
    const url = `http://localhost:64672/api/`
    React.useEffect(() => {
        const u = JSON.parse(localStorage.getItem('user'));
        if (u) {
            setCurUser(u);
        }
    }, null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        localStorage.removeItem('user')
        setCurUser(null)
        navigate('/')
    }

    const deleteUser = () => {
        //DELETE
        // לקרוא לפונקצית מחיקה מהשרת
        axios.delete(url + localStorage.getItem('status') + '/' + localStorage.getItem('user').id)
            .then(logOut())
    }

    const editDetails = () => {
        //GET
        axios.get(url + localStorage.getItem('status') + '/' + localStorage.getItem('user').id)
            .then(() => {
                if (localStorage.getItem('status') === 'candidate')
                    navigate('/signInWorker', {state: {user: JSON.parse(localStorage.getItem('user'))}})
                else
                    navigate('/SignInEmployer')
            })
        //לנווט לטופס הרשמה עם פרופס של המשתמש עפ"י הסטטוס שבלוקל סטורג
    }

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white' }}>
            <Container direction="column" maxWidth="xl">

                <Toolbar disableGutters>
                    <img src={require('./images/logo.png')} style={{ width: '9vw', margin: 10 }}></img>
                    <IconButton
                        onClick={() => navigate('/')}
                        // color='success'
                        // sx={{color:'white'}}
                        aria-label="add to shopping cart">
                        <HomeRoundedIcon />
                    </IconButton>


                    {/* 
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                    {/* </Menu>
                    </Box>  */}

                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography> */}
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu()
                                navigate('/about')
                            }}
                            sx={{ m: 2, my: 2, color: 'black', display: 'block', fontSize: '20px' }}
                        >
                            אודות
                        </Button>
                        {/* ----------צריך להוסיף כאן את הדפים לפי המשתמש שנמצא במערכת ------------------------*/}
                        {/* {pages.map((page) => ( */}
                        {/* <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button> */}
                        {/* ))} */}
                    </Box>

                    {currUser != null && localStorage.getItem('user') != null ?
                        <>

                            <Typography sx={{ margin: 3 }} textAlign="center">{currUser.name}</Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="פתח תפריט">
                                    <IconButton
                                        size="large"
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}>
                                        <AccountCircle fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {/* {settings.map((setting) => ( */}
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseUserMenu()
                                            editDetails()
                                        }}>
                                        <Typography textAlign="center">עריכת פרטים</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu()
                                        logOut()
                                    }}>
                                        <Typography textAlign="center">יציאה</Typography>
                                    </MenuItem>
                                    {/* ))} */}
                                    <MenuItem>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color='error'
                                            onClick={() => {
                                                handleCloseUserMenu()
                                                deleteUser()
                                            }}

                                        >מחק משתמש</Button>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </> :
                        <Button
                            variant="contained"
                            color='success'
                            onClick={() => { navigate('/logIn') }}>
                            לכניסה
                        </Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
