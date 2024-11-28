import React, { useState, useEffect } from "react";
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
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const [isImageFieldVisible, setIsImageFieldVisible] = useState(false); // Control visibility of the image field
    const [profileData, setProfileData] = useState({
        name: "Dr. Shabrina",
        specialization: "Psychologist",
        email: "shabrina@example.com",
        phone: "(123) 456-7890",
        imageUrl: "", // Profile image URL
    });

    // Load profile data from sessionStorage on component mount
    useEffect(() => {
        const savedProfileData = sessionStorage.getItem("therapistProfile");
        if (savedProfileData) {
            const parsedData = JSON.parse(savedProfileData);
            setProfileData(parsedData);
            if (parsedData.imageUrl) {
                setIsImageFieldVisible(true); // Show the image URL field if an image exists
            }
        }
    }, []);

    // Save profile data to sessionStorage
    const handleSave = () => {
        sessionStorage.setItem("therapistProfile", JSON.stringify(profileData));
        setIsEditing(false);
    };

    // Save image URL independently and disable the field
    const handleSaveImage = () => {
        sessionStorage.setItem("therapistProfile", JSON.stringify(profileData));
        setIsImageFieldVisible(false); // Hide the "Add Profile Picture" button
        alert("Profile image saved successfully!");
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Show the image URL input field
    const handleAddImageField = () => setIsImageFieldVisible(true);

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
                            src={profileData.imageUrl} // Dynamically set the image URL
                        >
                            {!profileData.imageUrl && "T"}
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

                            {/* Add Profile Picture Button */}
                            {!profileData.imageUrl && (
                                <Grid item xs={12}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={handleAddImageField}
                                    >
                                        Add Profile Picture
                                    </Button>
                                </Grid>
                            )}

                            {/* Image URL */}
                            {isImageFieldVisible && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="Profile Image URL"
                                        fullWidth
                                        value={profileData.imageUrl}
                                        name="imageUrl"
                                        onChange={handleChange}
                                        disabled={!isEditing && profileData.imageUrl !== ""}
                                    />
                                    <Box mt={2} display="flex" justifyContent="center">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={handleSaveImage}
                                            disabled={!profileData.imageUrl} // Only enable if the URL is not empty
                                        >
                                            Save Image
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>

                        {/* General Action Buttons */}
                        <Box mt={3} display="flex" justifyContent="space-between">
                            {!isEditing ? (
                                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                                    Edit
                                </Button>
                            ) : (
                                <Button variant="contained" color="success" onClick={handleSave}>
                                    Save Profile
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
