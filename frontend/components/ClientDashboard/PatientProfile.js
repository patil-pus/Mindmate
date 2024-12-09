import React from "react";
import { AppBar, Toolbar, Box,Grid,Paper,Divider, Typography, Button, TextField, IconButton, Badge, Card, CardContent, Avatar, Link } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGlobal } from "../../contexts/GlobalContext";

const ProfileContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    minHeight: "100vh",
    padding: "40px 20px",
});

const ProfileCard = styled(Paper)({
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    marginTop: "200px",
});

const SectionCard = styled(Paper)({
    padding: "30px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
});

const AppointmentItem = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
});

const BackButton = styled(Button)({
    alignSelf: "flex-start",
    marginBottom: "20px",
    color: "#1976D2",
    fontWeight: "bold",
});

const PatientProfile = () => {
    const router = useRouter();
    const { user, userType } = useGlobal();

    if (!user || userType !== "client") {
        console.log("No client");
        return <Typography variant="h6">Loading client profile...</Typography>;
    }

    const clientData = user;

    return (
        <ProfileContainer>

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
                    <Button color="inherit" href="/Dashboard">Home</Button>
                    <Button color="inherit" href="/Chat">Chat</Button>
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

            {/* Back Button */}
            <BackButton
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push("/Dashboard")}
            >
                Back to Home
            </BackButton>


            {/* Profile Header */}
            <ProfileCard>
                <Avatar
                    src={clientData?.imageUrl || ""}
                    sx={{
                        width: 320,
                        height: 320,
                        margin: "auto",
                        bgcolor: "#1976D2",
                        
                    }}
                >
                    {clientData?.name?.charAt(0)}
                </Avatar>
                <Typography
                    variant="h4"
                    mt={3}
                    fontWeight="bold"
                    sx={{ fontSize: "2rem" }}
                >
                    {clientData?.name || "N/A"}
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={1}>
                    Patient ID: {clientData?.id || "Unknown"}
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={1}>
                    Profession: {clientData?.profession || "Not Specified"}
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={1}>
                    Age: {clientData?.age || "Unknown"}
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={1}>
                    Gender: {clientData?.sex || "Not Specified"}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, padding: "10px 20px", fontSize: "1rem" }}
                >
                    Edit Profile
                </Button>
            </ProfileCard>

            {/* Additional Sections */}
            <Box mt={5} width="100%" maxWidth="1200px">
                <Grid container spacing={4}>
                    {/* Appointments History */}
                    <Grid item xs={12} md={6}>
                        <SectionCard>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                mb={3}
                                sx={{ fontSize: "1.5rem", color: "#1976D2" }}
                            >
                                Appointments History
                            </Typography>
                            <Divider />
                            <AppointmentItem>
                                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    Check-up: Jan 15, 2024
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem", color: "#757575" }}
                                >
                                    Dr. Smith
                                </Typography>
                            </AppointmentItem>
                            <Divider />
                            <AppointmentItem>
                                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    Follow-up: Jan 10, 2024
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem", color: "#757575" }}
                                >
                                    Dr. Lee
                                </Typography>
                            </AppointmentItem>
                            <Divider />
                            <AppointmentItem>
                                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    Consultation: Jan 5, 2024
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem", color: "#757575" }}
                                >
                                    Dr. Taylor
                                </Typography>
                            </AppointmentItem>
                        </SectionCard>
                    </Grid>

                    {/* Upcoming Appointments */}
                    <Grid item xs={12} md={6}>
                        <SectionCard>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                mb={3}
                                sx={{ fontSize: "1.5rem", color: "#1976D2" }}
                            >
                                Upcoming Appointments
                            </Typography>
                            <Divider />
                            <AppointmentItem>
                                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    Check-up: Feb 2, 2024
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem", color: "#757575" }}
                                >
                                    10:00 AM
                                </Typography>
                            </AppointmentItem>
                            <Divider />
                            <AppointmentItem>
                                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    Therapy Session: Feb 5, 2024
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem", color: "#757575" }}
                                >
                                    2:30 PM
                                </Typography>
                            </AppointmentItem>
                            <Divider />
                            <AppointmentItem>
                                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    Blood Test: Feb 10, 2024
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem", color: "#757575" }}
                                >
                                    9:00 AM
                                </Typography>
                            </AppointmentItem>
                        </SectionCard>
                    </Grid>
                </Grid>
            </Box>
        </ProfileContainer>
    );
};

export default PatientProfile;
