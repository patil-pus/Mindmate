import React, { useState } from 'react';
import { Button, TextField, Link, Grid, Box, Typography, Container, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { keyframes } from '@mui/system';

const mindMateLogo = '/logo.png';

const pulsingBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function SignUp() {
  const [userType, setUserType] = useState('client');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('Name'),
      age: data.get('age'),
      sex: data.get('sex'),
      email: data.get('email'),
      password: data.get('password'),
      userType: data.get('userType'),
      ...(userType === 'client' ? { insurance: data.get('insurance'), profession: data.get('profession') } : {}),
      ...(userType === 'therapist' ? { location: data.get('location'), specialization: data.get('specialization') } : {}),
    });
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
          maxWidth: 450,  // Slightly compress the width
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
              <FormControlLabel value="client" control={<Radio sx={{ color: '#3a86ff' }} />} label="Client" />
              <FormControlLabel value="therapist" control={<Radio sx={{ color: '#3a86ff' }} />} label="Therapist" />
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
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
            </Grid>

            {userType === 'client' && (
              <>
                <Grid item xs={12}>
                  <TextField required fullWidth id="profession" label="Profession" name="profession" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                </Grid>
              </>
            )}

            {userType === 'therapist' && (
              <>
                <Grid item xs={12}>
                  <TextField required fullWidth id="location" label="Location" name="location" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="specialization" label="Specialization" name="specialization" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }} />
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
