"use client";

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Alert,
    Badge,
    Snackbar,
    IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from 'framer-motion';
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useGlobal } from "../../contexts/GlobalContext"; 
import { useRouter } from 'next/router';

function BookingPage() {
    const { therapists, error } = useGlobal(); // Access therapists from the global context
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        date: null,
        time: null,
        description: "",
    });
    const [formError, setFormError] = useState("");
     const [successMessage, setSuccessMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const router = useRouter();

    const handleBookSession = (therapist) => {
        setSelectedTherapist(therapist);
        setOpenBookingDialog(true);
    };

    const handleConfirmBooking = () => {
        if (!bookingDetails.date || !bookingDetails.time || !bookingDetails.description) {
           alert("Please fill all fields to confirm your booking.");
            return;
        }
        setFormError("");
     const message = `Booking confirmed with ${selectedTherapist?.name} on ${dayjs(
            bookingDetails.date
        ).format("DD/MM/YYYY")} at ${dayjs(bookingDetails.time).format("hh:mm A")}.`;

        setSuccessMessage(message);
        setShowSnackbar(true); 
           setTimeout(() => {
            setShowSnackbar(false); // Hide Snackbar
            router.push("/InpersonAppointment"); // Navigate to the payment page
        }, 800);
    };
     const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };


    if (error) {
        return (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Typography variant="h6" color="error">
                    Error loading therapists: {error}
                </Typography>
            </Box>
        );
    }

    if (!therapists || therapists.length === 0) {
        return (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Typography variant="h6">No therapists available.</Typography>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ background: "#e3f2fd", minHeight: "100vh", py: 4 }}>
                {/* Header */}
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

                {/* Hero Section */}
                <Container sx={{ py: 5 }}>
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        style={{ fontWeight: "bold", color: "black", marginTop:'100px' }}
                    >
                        Welcome to Your Path to Wellness
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        style={{ color: "black", marginBottom: "20px" }}
                    >
                        Discover the support and guidance you deserve with our professional therapy services.
                        Whether you're seeking help for personal growth, emotional challenges, or simply need someone to talk to, we’re here to listen and empower you.
                    </Typography>
                     <Box display="flex" justifyContent="center" mb={4}>
                        <img
                            src="/inperson.webp"
                            alt="MindMate Journal"
                            style={{
                                width: '70%',
                                margin: '10px',
                                maxWidth: '1200px',
                                height: 'auto',
                                borderRadius: '12px',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            }}
                        />
                    </Box>

                </Container>
                    
                {/* Therapists Section */}
                <Container>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        style={{ fontWeight: "bold", color: "#1a237e" }}
                        marginBottom="50px"
                    >
                        Therapists Who Will Help You Grow
                    </Typography>

                    <Grid container spacing={4}>
    {therapists.map((therapist) => (
        <Grid item xs={12} sm={6} md={4} key={therapist.id}>
            <Box
                style={{
                    borderRadius: "15px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    background: "#ffffff",
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                {/* Therapist Image */}
                <Box
                    component="img"
                    src={therapist.imageUrl}
                    alt={therapist.name}
                    style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "15px 15px 0 0",
                        marginBottom: "15px",
                    }}
                />

                {/* Therapist Name */}
                <Typography
                    variant="h6"
                    style={{
                        fontWeight: "bold",
                        color: "#1a73e8", // Therapist name in blue shade
                    }}
                >
                    {therapist.name}
                </Typography>

                {/* Therapist Details */}
                <Typography variant="body2" color="textSecondary">
                    <strong>Specialization:</strong> {therapist.specialization}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {therapist.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Age:</strong> {therapist.age}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Language:</strong> {therapist.language}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Insurance:</strong> {therapist.insurance}
                </Typography>

                {/* Booking Button */}
                <Button
                    variant="contained"
                    onClick={() => handleBookSession(therapist)}
                    fullWidth
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        borderRadius: "8px",
                        marginTop: "15px",
                        padding: "10px",
                    }}
                >
                    Book Now
                </Button>
            </Box>
        </Grid>
    ))}
</Grid>

                </Container>

                {/* Booking Confirmation Dialog */}
              <Dialog
    open={openBookingDialog}
    onClose={() => setOpenBookingDialog(false)}
    PaperProps={{
        sx: {
            padding: 3,
            borderRadius: 3,
        },
    }}
>
    <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}>
        Confirm Your Booking
    </DialogTitle>
    <DialogContent>
        {/* Date Picker */}
        <Box sx={{ mb: 4 }}>
            <DatePicker
                label="Select Date"
                value={bookingDetails.date}
                onChange={(newValue) =>
                    setBookingDetails({ ...bookingDetails, date: newValue })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            "& .MuiInputBase-root": {
                                backgroundColor: "#f9f9f9",
                                borderRadius: 2,
                            },
                        }}
                    />
                )}
            />
        </Box>

        {/* Time Picker */}
        <Box sx={{ mb: 3 }}>
            <TimePicker
                label="Select Time"
                value={bookingDetails.time}
                onChange={(newValue) =>
                    setBookingDetails({ ...bookingDetails, time: newValue })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            "& .MuiInputBase-root": {
                                backgroundColor: "#f9f9f9",
                                borderRadius: 2,
                            },
                        }}
                    />
                )}
            />
        </Box>

        {/* Description */}
        <Box sx={{ mb: 3 }}>
            <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={bookingDetails.description}
                onChange={(e) =>
                    setBookingDetails({ ...bookingDetails, description: e.target.value })
                }
                sx={{
                    "& .MuiInputBase-root": {
                        backgroundColor: "#f9f9f9",
                        borderRadius: 2,
                    },
                }}
            />
        </Box>

        {/* Error Message */}
        {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
            </Alert>
        )}
    </DialogContent>

    <DialogActions
        sx={{
            justifyContent: "center",
            gap: 2,
            paddingBottom: 2,
        }}
    >
        <Button
            onClick={() => setOpenBookingDialog(false)}
            variant="outlined"
            color="primary"
            sx={{ padding: "8px 24px", borderRadius: 2 }}
        >
            Cancel
        </Button>
        <Button
            onClick={handleConfirmBooking}
            variant="contained"
            color="primary"
            sx={{
                padding: "8px 24px",
                backgroundColor: "#1a73e8",
                borderRadius: 2,
                "&:hover": { backgroundColor: "#165bb4" },
            }}
        >
            Confirm Booking
        </Button>
        <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{
                        width: "100%",
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        fontWeight: "bold",
                    }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
    </DialogActions>
</Dialog>

            </Box>
        </LocalizationProvider>
    );
}

export default BookingPage;
