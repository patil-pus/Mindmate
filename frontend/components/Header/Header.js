import React from 'react'
import { AppBar, Toolbar, Box,CircularProgress, Typography, Button, TextField, IconButton, Badge, Card, CardContent, Avatar, Link } from "@mui/material";
import { motion } from 'framer-motion';
import NotificationsIcon from "@mui/icons-material/Notifications";
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';
import { useGlobal } from '../../contexts/GlobalContext';

const Header = () => {
    const router = useRouter();
const {userType} = useGlobal()
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
    <Toolbar>
         <motion.img
            src={'/logo.png'}
            alt="MindMate Logo"
            style={{
            width: 90,
            height: 80,
            marginBottom: 20,
            marginTop: 20,
            margin:20,
            borderRadius: '50%',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
        />
        <Typography variant="h4" sx={{ flexGrow: 9 }}>
            MindMate
        </Typography>
        <Button color="inherit" onClick={() => router.push(userType == 'client'?"/Dashboard" :"TherapistDashboard")}>Home</Button>
        <Button color="inherit" onClick={() => router.push("/Chat")}>Chat</Button>
        <Button href="/PatientProfile" color="inherit">Profile</Button>
        <Button color="inherit">Settings</Button>
        <Button href="/LogoutPage" color="inherit">Logout</Button>
        <IconButton color="inherit">
            <Badge color="secondary" variant="dot">
                <NotificationsIcon />
            </Badge>
        </IconButton>
    </Toolbar>
</AppBar>
  )
}

export default Header