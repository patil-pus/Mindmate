import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGlobal } from "../contexts/GlobalContext";

// Animated Number Hook (Logic unchanged)
const useAnimatedNumber = (targetValue) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000; // 1 second
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        const timer = setInterval(() => {
            start += 1;
            if (start >= targetValue) {
                clearInterval(timer);
                start = targetValue;
            }
            setValue(start);
        }, stepTime);
        return () => clearInterval(timer);
    }, [targetValue]);

    return value;
};

// Styled components
const MainContent = styled(Box)({
    flex: 1,
    padding: "20px",
    width: "100%",
    backgroundColor: "#F9FAFB",
});

const WelcomeCard = styled(Paper)({
    backgroundColor: "#FFFFFF",
    color: "#333333",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
});

const StatsCard = styled(Paper)({
    padding: "20px",
    textAlign: "center",
    color: "#333333",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
});

const ScheduleBox = styled(Box)({
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    color: "#1976D2",
});

const ProfileCard = styled(Paper)({
    padding: "20px",
    color: "#333333",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
});

const TherapistDashboard = () => {
    const patients = useAnimatedNumber(1032);
    const consultations = useAnimatedNumber(207);


    return (
        <Box display="flex" flexDirection="column" height="100vh">
            {/* Top Navigation Bar (UI Updated) */}
            <AppBar position="fixed" sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                <Toolbar>
                    <Box
                        component="img"
                        src={'/logo.png'}
                        alt="MindMate Logo"
                        sx={{
                            width: 90,
                            height: 80,
                            marginBottom: 2,
                            marginTop: 2,
                            marginRight: 2,
                            borderRadius: '50%',
                            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
                            padding: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }}
                    />
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        MindMate
                    </Typography>
                    <Button color="inherit" href="/TherapistDashboard">
                        <HomeIcon sx={{ marginRight: 1 }} /> Home
                    </Button>
                    <Button color="inherit" href="/Chat">
                        <MessageIcon sx={{ marginRight: 1 }} /> Chat
                    </Button>
                    <Button href="/TherapistProfile" color="inherit">
                        <AccountCircleIcon sx={{ marginRight: 1 }} /> Profile
                    </Button>
                    <Button color="inherit">
                        <SettingsIcon sx={{ marginRight: 1 }} /> Settings
                    </Button>
                    <Button href="/LogoutPage" color="inherit">
                        <ExitToAppIcon sx={{ marginRight: 1 }} /> Logout
                    </Button>
                    <IconButton color="inherit">
                        <Badge color="secondary" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <MainContent sx={{ mt: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <WelcomeCard>
                            <Typography variant="h5" fontWeight="bold">
                                Welcome, Dr. Shabrina
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Have a nice day at work
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                                Add Patient
                            </Button>
                        </WelcomeCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatsCard>
                            <Typography variant="h6" fontWeight="bold">Patient Statistics</Typography>
                            <Typography variant="body1" color="textSecondary">This Month</Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Box>
                                    <Typography variant="h4" color="primary">{patients}</Typography>
                                    <Typography variant="body2" color="textSecondary">Patients</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h4" color="primary">{consultations}</Typography>
                                    <Typography variant="body2" color="textSecondary">Consultations</Typography>
                                </Box>
                            </Box>
                        </StatsCard>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Upcoming Appointments
                    </Typography>
                    <ScheduleBox>
                        <Typography variant="body1" mb={1}>
                            Check-up - Jan 28, 10 AM
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            Consultation - Jan 28, 2 PM
                        </Typography>
                        <Typography variant="body1">
                            Surgery - Jan 29, 9 AM
                        </Typography>
                    </ScheduleBox>
                </Box>

                <ProfileCard>
                    <Avatar sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#1976D2" }}>D</Avatar>
                    <Typography variant="h6" align="center" mt={2}>Dr. Shabrina</Typography>
                    <Typography variant="body2" align="center" color="textSecondary">Cardiologist</Typography>
                    <Box mt={2}>
                        <Typography variant="body2" fontWeight="bold">Last Patients</Typography>
                        <Box mt={1}>
                            <Typography variant="body2" color="textSecondary">- Arya Wijaya Kusuma: Jan 28, 9 AM</Typography>
                            <Typography variant="body2" color="textSecondary">- Sheryl Indirani: Jan 27, 10 AM</Typography>
                            <Typography variant="body2" color="textSecondary">- Nafiu Efenday: Jan 26, 7 AM</Typography>
                        </Box>
                    </Box>
                </ProfileCard>
            </MainContent>
        </Box>
    );
};

export default TherapistDashboard;
