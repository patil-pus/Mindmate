import React from "react";
import { Box, Typography, Avatar, Paper, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useGlobal } from "../contexts/GlobalContext";

const ProfileContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    minHeight: "100vh",
    padding: "40px 20px",
});

const ProfileCard = styled(Paper)({
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
});

const SectionCard = styled(Paper)({
    padding: "20px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
});

const PatientProfile = () => {
    const { user } = useGlobal(); // Assuming user contains client details
    const clientData = user; // Use the `user` object directly as `clientData`

    if (!clientData) {
        return <Typography>Loading...</Typography>; // Handle case when user is not yet loaded
    }

    return (
        <ProfileContainer>
            {/* Profile Header */}
            <ProfileCard>
                <Avatar
                    src={clientData?.imageUrl || ""}
                    sx={{ width: 100, height: 100, margin: "auto", bgcolor: "#1976D2" }}
                >
                    {clientData?.name?.charAt(0)}
                </Avatar>
                <Typography variant="h5" mt={2} fontWeight="bold">
                    {clientData?.name || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Patient ID: {clientData?.id || "Unknown"}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Profession: {clientData?.profession || "Not Specified"}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Age: {clientData?.age || "Unknown"}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Gender: {clientData?.sex || "Not Specified"}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Edit Profile
                </Button>
            </ProfileCard>

            {/* Additional Sections */}
            <Box mt={4} width="100%" maxWidth="1200px">
                <Grid container spacing={3}>
                    {/* Appointments History */}
                    <Grid item xs={12} md={6}>
                        <SectionCard>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Appointments History
                            </Typography>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    - Check-up: Jan 15, 2024 - Dr. Smith
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    - Follow-up: Jan 10, 2024 - Dr. Lee
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    - Consultation: Jan 5, 2024 - Dr. Taylor
                                </Typography>
                            </Box>
                        </SectionCard>
                    </Grid>

                    {/* Upcoming Appointments */}
                    <Grid item xs={12} md={6}>
                        <SectionCard>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Upcoming Appointments
                            </Typography>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    - Check-up: Feb 2, 2024 - 10:00 AM
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    - Therapy Session: Feb 5, 2024 - 2:30 PM
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    - Blood Test: Feb 10, 2024 - 9:00 AM
                                </Typography>
                            </Box>
                        </SectionCard>
                    </Grid>
                </Grid>
            </Box>
        </ProfileContainer>
    );
};

export default PatientProfile;
