import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Paper,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGlobal } from "../contexts/GlobalContext";
import { useRouter } from 'next/router';
const useAnimatedNumber = (targetValue) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000;
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

const ProfileCard = styled(Paper)({
    padding: "20px",
    color: "#333333",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
});

const TherapistDashboard = () => {
    const router = useRouter();
    const { user, error } = useGlobal();
    console.log(user);
    const [userType, setUserType] = useState(null);
    const patients = useAnimatedNumber(1032);
    const consultations = useAnimatedNumber(207);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserType = sessionStorage.getItem("userType");
            console.log(storedUserType);
            setUserType(storedUserType);
            console.log("User Type:", storedUserType);
            console.log("user",user)
        }
    }, []);

    if (error) {
        return (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Typography variant="h6">Loading therapist data...</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            {/* AppBar */}
            <AppBar position="fixed" sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                <Toolbar>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        MindMate
                    </Typography>
                    <Button color="inherit" href="/TherapistDashboard">
                        <HomeIcon sx={{ marginRight: 1 }} /> Home
                    </Button>
                    <Button color="inherit" onClick={() => router.push("/Chat")}>
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

            {/* Main Content */}
            <MainContent sx={{ mt: 10 }}>
                <Grid container spacing={3}>
                    {/* Welcome Card */}
                    <Grid item xs={12} md={8}>
                        <WelcomeCard>
                            <Typography variant="h5" fontWeight="bold">
                                Welcome, Dr. {user.name || "Therapist"}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Have a great day at work!
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Patients Today: {patients}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                Consultations Completed: {consultations}
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                                Add Patient
                            </Button>
                        </WelcomeCard>
                    </Grid>

                    {/* Profile Card */}
                    <Grid item xs={12} md={4}>
                        <ProfileCard>
                            <Avatar
                                sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#1976D2" }}
                            >
                                {user.name?.charAt(0).toUpperCase() || "D"}
                            </Avatar>
                            <Typography variant="h6" align="center" mt={2}>
                                Dr. {user.name}
                            </Typography>
                            <Typography variant="body2" align="center" color="textSecondary">
                                {user.specialization || "Specialist"}
                            </Typography>
                        </ProfileCard>
                    </Grid>
                </Grid>
            </MainContent>
        </Box>
    );
};

export default TherapistDashboard;
