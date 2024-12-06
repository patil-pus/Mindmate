import React, { useState } from 'react';
import { Button, TextField, Snackbar, Alert, Link, Grid, Box, Typography, Container, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { keyframes } from '@mui/system';
import { useRouter } from 'next/router';

const mindMateLogo = '/logo.png';

const pulsingBackground = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

export default function SignUp() {
    const router = useRouter();
    const [userType, setUserType] = useState('client');
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('Name');
        const age = data.get('age');
        const sex = data.get('sex');
        const username = data.get('username');
        const password = data.get('password');
        const profession = data.get('profession');
        const location = data.get('location');
        const specialization = data.get('specialization');
        const language = data.get('language');
        const insurance = data.get('insurance');

        // Basic validation
        if (!name || !age || !sex || !username || !password) {
            setAlertMessage('Please fill in all required fields.');
            setOpenAlert(true);
            return;
        }

        if (password.length < 3) {
            setAlertMessage('Password must be at least 3 characters long.');
            setOpenAlert(true);
            return;
        }

        if (userType === 'client' && !profession) {
            setAlertMessage('Profession is required for clients.');
            setOpenAlert(true);
            return;
        }

        if (userType === 'therapist' && (!location || !specialization || !language || !insurance)) {
            setAlertMessage('Location, specialization, language, and insurance are required for therapists.');
            setOpenAlert(true);
            return;
        }

        const user = {
            name,
            age: parseInt(age, 10),
            sex,
            username,
            password,
            role: userType,
            ...(userType === 'client' && { profession }),
            ...(userType === 'therapist' && { location, specialization, language, insurance }),
        };

        const endpoint =
            userType === 'client'
                ? 'http://localhost:8080/api/clients/register'
                : 'http://localhost:8080/api/therapists/register';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                // The request failed, inspect the response
                const contentType = response.headers.get('content-type');
                let errorMessage = `Sign-up failed with status ${response.status}`;

                if (contentType && contentType.includes('application/json')) {
                    try {
                        const errorData = await response.json();
                        console.error('Server error JSON:', errorData);
                        // If the server returns a message, use it
                        errorMessage = errorData.message || errorMessage;
                    } catch (jsonError) {
                        console.error('Error parsing JSON error response:', jsonError);
                    }
                } else {
                    // If not JSON, attempt to read as text
                    const textError = await response.text();
                    console.error('Server error (non-JSON):', textError);
                    errorMessage += `. Server responded with: ${textError}`;
                }

                alert(errorMessage);
                return;
            }

            // If we reach here, response is ok
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // Unexpected response type
                const textResponse = await response.text();
                console.warn('Expected JSON, got:', textResponse);
                alert('Sign up successful, but response was not JSON. Check the server.');
                router.push("/SignIn");
                return;
            }

            const resData = await response.json();
            console.log('Response:', resData);
            alert('Sign up successful');
            router.push("/SignIn");

        } catch (error) {
            console.error('Error during sign up:', error);
            setAlertMessage('An unexpected error occurred. Please try again.');
            setOpenAlert(true);
        }
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
                overflow: 'hidden',
                background: 'linear-gradient(120deg, #FFDEE9, #B5FFFC)',
                backgroundSize: '200% 200%',
                animation: `${pulsingBackground} 8s ease infinite`,
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: 20,
                    padding: 30,
                    boxShadow: '0px 8px 32px rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    maxWidth: 450,
                    width: '90%',
                    zIndex: 1,
                }}
            >
                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.1} transitionSpeed={300}>
                    <motion.img
                        src={mindMateLogo}
                        alt="MindMate Logo"
                        initial={{ y: -10 }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: 90,
                            height: 90,
                            marginBottom: 20,
                            borderRadius: '50%',
                            padding: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0px 0px 15px #64ffda, 0 0 30px #64ffda',
                        }}
                    />
                </Tilt>

                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: '#1976d2',
                        mb: 2,
                    }}
                >
                    Sign Up for MindMate
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel component="legend" sx={{ color: '#3a86ff', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            I am a
                        </FormLabel>
                        <RadioGroup row value={userType} onChange={handleUserTypeChange} name="userType">
                            <FormControlLabel
                                value="client"
                                control={<Radio sx={{ color: '#3a86ff' }} />}
                                label="Client"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                            <FormControlLabel
                                value="therapist"
                                control={<Radio sx={{ color: '#3a86ff' }} />}
                                label="Therapist"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </RadioGroup>
                    </FormControl>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required fullWidth id="name" label="Name" name="Name" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required fullWidth id="age" label="Age" name="age" type="number" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required fullWidth id="sex" label="Sex" name="sex" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth id="username" label="Username" name="username" autoComplete="username" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                        </Grid>

                        {userType === 'client' && (
                            <Grid item xs={12}>
                                <TextField required fullWidth id="profession" label="Profession" name="profession" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                            </Grid>
                        )}

                        {userType === 'therapist' && (
                            <>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="location" label="Location" name="location" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="specialization" label="Specialization" name="specialization" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="language" label="Language" name="language" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="insurance" label="Insurance Accepted" name="insurance" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                                </Grid>
                            </>
                        )}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: 'linear-gradient(135deg, #6dd5ed, #2193b0)',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: 4,
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        Sign Up
                    </Button>

                    <Snackbar
                        open={openAlert}
                        autoHideDuration={6000}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseAlert} severity="error">
                            {alertMessage}
                        </Alert>
                    </Snackbar>

                    <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
                        <Grid item>
                            <Link href="/SignIn" variant="body2" sx={{ color: '#1976d2' }}>
                                Already have an account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </Container>
    );
}
