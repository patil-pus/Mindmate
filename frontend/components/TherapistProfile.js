import React, { useState } from "react";
import { Box, Typography, Avatar, Paper, Button, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion"; // For animations

// Styled Components
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
    maxWidth: "500px",
});

const TherapistProfile = () => {
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing
    const [profileData, setProfileData] = useState({
        name: "Dr. Shabrina",
        specialization: "Psychologist",
        email: "shabrina@example.com",
        phone: "(123) 456-7890",
    });

    // Toggle edit/save mode
    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
        setIsEditing(false);
        console.log("Saved Data:", profileData); // Add save logic here
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <ProfileContainer>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <ProfileCard>
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                margin: "auto",
                                bgcolor: "#1976D2",
                            }}
                        >
                            T
                        </Avatar>
                    </motion.div>
                    <Typography variant="h5" mt={2} fontWeight="bold">
                        Therapist Profile
                    </Typography>

                    {/* Profile Form */}
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={profileData.name}
                                    name="name"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>

                            {/* Specialization */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Specialization"
                                    fullWidth
                                    value={profileData.specialization}
                                    name="specialization"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    value={profileData.email}
                                    name="email"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>

                            {/* Phone */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone"
                                    fullWidth
                                    value={profileData.phone}
                                    name="phone"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box mt={3} display="flex" justifyContent="space-between">
                            {!isEditing ? (
                                <Button variant="contained" color="primary" onClick={handleEdit}>
                                    Edit
                                </Button>
                            ) : (
                                <Button variant="contained" color="success" onClick={handleSave}>
                                    Save
                                </Button>
                            )}
                        </Box>
                    </Box>
                </ProfileCard>
            </motion.div>
        </ProfileContainer>
    );
};

export default TherapistProfile;
