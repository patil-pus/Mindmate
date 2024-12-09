import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper, Button, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useGlobal } from "../../contexts/GlobalContext";
import Header from "../Header/Header";

const ProfileContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    minHeight: "100vh",
    padding: "180px 20px",
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
    const [isEditing, setIsEditing] = useState(false);
    const { therapists, setTherapists } = useGlobal();
    const therapistId = typeof window !== "undefined" ? sessionStorage.getItem("therapistId") : null;

    const [profileData, setProfileData] = useState({
        name: "",
        specialization: "",
        location: "",
        insurance: "",
        imageUrl: "",
    });

    // Load therapist data from global context once therapists are loaded
    useEffect(() => {
        if (therapists && therapistId) {
            const currentTherapist = therapists.find(
                (therapist) => String(therapist.id) === String(therapistId)
            );

            if (currentTherapist) {
                setProfileData({
                    name: currentTherapist.name || "",
                    specialization: currentTherapist.specialization || "",
                    location: currentTherapist.location || "",
                    insurance: currentTherapist.insurance || "",
                    imageUrl: currentTherapist.imageUrl || "",
                });
            } else {
                console.error("Therapist with the specified ID not found in global context.");
            }
        }
    }, [therapists, therapistId]);

    // Save updates to the database
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/therapists/${therapistId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                const updatedTherapist = await response.json();

                // Update global context
                const updatedTherapists = therapists.map((therapist) =>
                    String(therapist.id) === String(therapistId)
                        ? { ...therapist, ...updatedTherapist }
                        : therapist
                );
                setTherapists(updatedTherapists);

                // Update local state to reflect changes immediately, including image
                setProfileData({
                    name: updatedTherapist.name || "",
                    specialization: updatedTherapist.specialization || "",
                    location: updatedTherapist.location || "",
                    insurance: updatedTherapist.insurance || "",
                    imageUrl: updatedTherapist.imageUrl || "",
                });

                alert("Profile updated successfully!");
                setIsEditing(false);
            } else {
                console.error("Failed to update profile:", response.statusText);
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating the profile.");
        }
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
            <Header/>
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
                            src={profileData.imageUrl}
                        >
                            {!profileData.imageUrl && "T"}
                        </Avatar>
                    </motion.div>
                    <Typography variant="h5" mt={2} fontWeight="bold">
                        Therapist Profile
                    </Typography>

                    <Box mt={3}>
                        <Grid container spacing={2}>
                            {["name", "specialization", "location", "insurance"].map((field) => (
                                <Grid item xs={12} key={field}>
                                    <TextField
                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        fullWidth
                                        value={profileData[field]}
                                        name={field}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <TextField
                                    label="Profile Image URL"
                                    fullWidth
                                    value={profileData.imageUrl}
                                    name="imageUrl"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>
                        </Grid>

                        <Box mt={3} display="flex" justifyContent="space-between">
                            {!isEditing ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleSave}
                                >
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
