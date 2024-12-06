import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MindMate
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignInSide() {
    const router = useRouter();
    const [loginFailed, setLoginFailed] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            setAlertMessage('Please fill in all required fields.');
            setOpenAlert(true);
            return;
        }

        if (password.length < 3) {
            setAlertMessage('Password must be at least 3 characters long.');
            setOpenAlert(true);
            return;
        }

        try {
            let response = await fetch('http://localhost:8080/api/clients/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                // If client login fails, try therapist login
                response = await fetch('http://localhost:8080/api/therapists/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: email, password }),
                    credentials: 'include',
                });
            }

            if (response.ok) {
                const resData = await response.json();
                console.log("response data", resData);
                const { clientId, client, therapistId, therapist }  = resData;

                if (client) {
                    const { role } = client;
                    sessionStorage.setItem('clientId', clientId);
                    if (role === 'client') {
                        console.log("client role");
                        // **NEW**: Set userType for client
                        sessionStorage.setItem('userType', 'client');
                        router.push('/Dashboard');
                    } else {
                        console.error('Unexpected client role:', role);
                    }
                } else if (therapist) {
                    const { role } = therapist;
                    sessionStorage.setItem('therapistId', therapistId);
                    if (role === 'therapist') {
                        console.log('therapist role');
                        // **NEW**: Set userType for therapist
                        sessionStorage.setItem('userType', 'therapist');
                        router.push('/TherapistDashboard');
                    } else {
                        console.error('Unexpected therapist role:', role);
                    }
                } else {
                    console.error('Neither client nor therapist object found in response');
                }
            } else {
                setLoginFailed(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginFailed(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoginFailed(false);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            {/* Left side background image */}
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/imgg.webp)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            {/* Right side form */}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="MindMate Logo"
                        sx={{ height: 80, mb: 2 }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            color: 'primary.main',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '3.25rem',
                            letterSpacing: '0.5px',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        MindMate
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 1,
                            color: 'black',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '2.25rem',
                            letterSpacing: '0.5px',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        Let's start your path to wellness...
                    </Typography>

                    <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/SignUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Box mt={15}>
                            <Copyright />
                        </Box>
                    </Box>
                </Box>
                <Snackbar
                    open={loginFailed}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="error">
                        Login failed. Please check your email and password and try again.
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
}
