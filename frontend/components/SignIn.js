import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, TextField, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import MuiAlert from '@mui/material/Alert';
import Tilt from 'react-parallax-tilt';
import { pulsingBackground } from './animations.js'; // Adjust the path if needed

const mindMateLogo = '/logo.png';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {

  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
   

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
     const email = data.get('email');
    const password = data.get('password');
    try{
      const response = await fetch('http://localhost:8080/api/clients/login',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({username: email, password}),
        credentials: 'include'                                                            //ensuring cookie to be sent with request
    });
    
    if(response.ok){
      const resData = await response.json();
      console.log("response",resData)
      sessionStorage.setItem('clientId', resData.clientId);
      console.log("client id", resData.clientId);

      router.push("/Dashboard");
   
    }else{
      console.log("Login failed")
      setLoginFailed(true);
    }
    }catch(error){
      console.error('Error during login:', error);
      setLoginFailed(true)
    }
    };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginFailed(false);
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
         fontFamily: 'Inter, sans-serif',
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
            
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs>
              <Link href="#" variant="body2" className="custom-link">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2" className="custom-link" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Snackbar open={loginFailed} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
            Login failed. Please check your email and password and try again.
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
}
