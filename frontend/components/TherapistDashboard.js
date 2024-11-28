import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Grid, Paper, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Styled Components for different sections
const Sidebar = styled(Box)({
    backgroundColor: "#F7F9FC",
    color: "#5F6368",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "100vh",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const ProfileAvatar = styled(Avatar)({
    width: "60px",
    height: "60px",
    marginBottom: "20px",
    backgroundColor: "#1976D2",
    fontSize: "20px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#135ba1",
    },
});

const SidebarIcon = styled(Box)({
    color: "#5F6368",
    marginBottom: "20px",
    cursor: "pointer",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "color 0.2s ease",
    "&:hover": {
        color: "#1976D2",
    },
    textDecoration: "none",
});

const MainContent = styled(Box)({
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

const ProfileCard = styled(Paper)({
    padding: "20px",
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
    color: "#1976D2", // Text color for appointments
});

// Animation Hook for Numbers
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

const TherapistDashboard = () => {
    // Animated Numbers
    const patients = useAnimatedNumber(1032);
    const consultations = useAnimatedNumber(207);

    return (
        <Box display="flex">
            {/* Sidebar */}
            <Sidebar>
                {/* Profile Avatar */}
                <ProfileAvatar>DS</ProfileAvatar>
                {/* Sidebar Icons */}
                <Link href="/TherapistDashboard" passHref>
                    <SidebarIcon>
                        <HomeIcon />
                    </SidebarIcon>
                </Link>
                <Link href="/messages" passHref>
                    <SidebarIcon>
                        <MessageIcon />
                    </SidebarIcon>
                </Link>
                <Link href="/TherapistProfile" passHref>
                    <SidebarIcon>
                        <AccountCircleIcon />
                    </SidebarIcon>
                </Link>
                <Link href="/LogoutPage" passHref>
                    <SidebarIcon>
                        <ExitToAppIcon />
                    </SidebarIcon>
                </Link>
            </Sidebar>

            {/* Main Content */}
            <MainContent>
                {/* Welcome and Stats Section */}
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

                {/* Schedule Section */}
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
            </MainContent>

            {/* Profile Section */}
            <Box width="300px" p={2}>
                <ProfileCard>
                    <Avatar sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#1976D2" }}>D</Avatar>
                    <Typography variant="h6" align="center" mt={2}>Dr. Shabrina</Typography>
                    <Typography variant="body2" align="center" color="textSecondary">Cardiologist</Typography>
                    <Box mt={2}>
                        <Typography variant="body2" fontWeight="bold">Last Patients</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>AW</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Arya Wijaya Kusuma" secondary="Jan 28, 9 AM" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>SI</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Sheryl Indirani" secondary="Jan 27, 10 AM" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>NM</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Nafiu Efenday" secondary="Jan 26, 7 AM" />
                            </ListItem>
                        </List>
                    </Box>
                </ProfileCard>
            </Box>
        </Box>
    );
};

export default TherapistDashboard;
