import React from 'react';
import Link from 'next/link';
import { Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { pulsingBackground } from './animations.js'; // Adjust the path if needed

const mindMateLogo = '/logo.png';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
        background: 'linear-gradient(120deg, #a8e6cf, #dcedc1, #ffd3b6)',
        backgroundSize: '400% 400%',
        animation: `${pulsingBackground} 15s ease infinite`, // Apply pulsing background
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 40,
          borderRadius: 20,
          boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
          maxWidth: 500,
          width: '90%',
        }}
      >
        <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.1} transitionSpeed={300}>
          <motion.img
            src={mindMateLogo}
            alt="MindMate Logo"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            style={{
              width: 80,
              height: 80,
              marginBottom: 20,
              borderRadius: '50%',
              boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
              padding: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          />
        </Tilt>

        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          Sign in to MindMate
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              backgroundColor: '#f8faff',
              borderRadius: 2,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              backgroundColor: '#f8faff',
              borderRadius: 2,
            }}
          />
          <Link href="/Dashboard" passHref>
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
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
              },
            }}
          >
            Sign In
          </Button>
          </Link>


          <Grid container sx={{ mt: 1 }}>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2" sx={{ color: '#1976d2' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}
