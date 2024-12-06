"use client"

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const therapists = [
    {
        id: 1,
        name: "Dr. Alice Carter ⭐",
        pronouns: "She/Her",
        specialization: "Anxiety, Depression",
        location: "Downtown Boston",
        reviews: [
            {
                feedback: "Dr. Carter helped me navigate my anxiety with care and expertise.",
                name: "Sarah J.",
            },
            {
                feedback: "Compassionate and attentive – highly recommend.",
                name: "John D.",
            },
            {
                feedback: "She transformed the way I handle my stress.",
                name: "Emily R.",
            },
        ],
    },
    {
        id: 2,
        name: "Dr. John Doe ⭐",
        pronouns: "He/Him",
        specialization: "Trauma",
        location: "Back Bay",
        reviews: [
            {
                feedback: "John truly listens and provides practical solutions.",
                name: "Chris M.",
            },

            {
                feedback: "Always professional and approachable.",
                name: "Nina K.",
            },
        ],
    },
    {
        id: 3,
        name: "Dr. Emily Stone",
        pronouns: "They/Them",
        specialization: "LGBTQ+ Support, Stress Management",
        location: "Beacon Hill",
        reviews: [
            {
                feedback: "Emily created a safe and welcoming space for me.",
                name: "Liam P.",
            },
            {
                feedback: "A life-changing experience – thank you, Emily!",
                name: "Jade L.",
            },
            {
                feedback: "Best therapist I’ve ever worked with.",
                name: "Riley B.",
            },
        ],
    },
    {
        id: 4,
        name: "Dr. Raj Kundra",
        pronouns: "He/Him",
        specialization: "Career and Life Transitions",
        location: "Charlestown",
        reviews: [
            {
                feedback: "He helped me gain clarity during a tough career transition and provided tools to manage stress and uncertainty. I now feel confident and excited about the future.",
                name: "Daniel W",
            },
        ],
    },
    {
        id: 5,
        name: "Dr. Anjali Mehta",
        pronouns: "She/Her",
        specialization: "Couples Therapist",
        location: "North End",
        reviews: [
            {
                feedback: "Anjali has been incredible in helping us navigate our relationship challenges. She created a safe space where we could express ourselves openly and learn how to communicate better. Thanks to her, we feel more connected than ever",
                name: "Laura M",
            },

        ],
    },
];

function BookingPage() {
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        date: null,
        time: null,
        description: "",
    });
    const [error, setError] = useState("");

    const handleBookSession = (therapist) => {
        setSelectedTherapist(therapist);
        setOpenBookingDialog(true);
    };

    const handleConfirmBooking = () => {
        if (!bookingDetails.date || !bookingDetails.time || !bookingDetails.description) {
            setError("Please fill all fields to confirm your booking.");
            return;
        }
        setError("");
        alert(
            `Booking confirmed with ${selectedTherapist.name} on ${dayjs(bookingDetails.date).format(
                "DD/MM/YYYY"
            )} at ${dayjs(bookingDetails.time).format("hh:mm A")}.`
        );
        setOpenBookingDialog(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ background: "#e3f2fd", minHeight: "100vh", py: 4 }}>
                {/* Header */}
                <AppBar position="static" style={{ backgroundColor: "#1a73e8" }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            MindMate
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Hero Section */}
                <Container sx={{ py: 5 }}>
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        style={{ fontWeight: "bold", color: "#1a237e" }}
                    >
                        Welcome to Your Path to Wellness
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        style={{ color: "#5c6bc0", marginBottom: "20px" }}
                    >
                        Discover the support and guidance you deserve with our professional therapy services.
                        Whether you're seeking help for personal growth, emotional challenges, or simply need someone to talk to, we’re here to listen and empower you.
                    </Typography>
                </Container>

                {/* How It Works */}
                <Container sx={{ py: 5 }}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: "#1a237e", fontWeight: "bold" }}>
                        How It Works
                    </Typography>
                    <Grid container spacing={4} sx={{ marginBottom: "40px" }}>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ background: "#dbe9f4", padding: "20px", borderRadius: "8px" }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    1. Choose Your Therapist
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Browse our diverse team of licensed therapists. Find someone who aligns with your needs and preferences.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ background: "#dbe9f4", padding: "20px", borderRadius: "8px" }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    2. Select Your Session Time
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Select the time for the session as per your convenience. We offer flexible options tailored to your lifestyle.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ background: "#dbe9f4", padding: "20px", borderRadius: "8px" }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    3. Book Your Appointment
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Use our easy online scheduling system to select a date and time that works best for you.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                {/* Therapist Section */}
                <Container>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        style={{ fontWeight: "bold", color: "#1a237e" }}
                    >
                        Therapists Who Will Help You Grow
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        style={{
                            color: "#3949ab",
                            marginBottom: "30px",
                        }}
                    >
                        We vet every therapist so you can start from a place of trust.
                    </Typography>

                    <Grid container spacing={4}>
                        {therapists.map((therapist) => (
                            <Grid item xs={12} sm={6} md={4} key={therapist.id}>
                                <Card
                                    style={{
                                        borderRadius: "15px",
                                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                                        background: "#ffffff",
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            style={{
                                                fontWeight: "bold",
                                                color: "#1a73e8", // Therapist name in blue shade
                                            }}
                                        >
                                            {therapist.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Pronouns:</strong> {therapist.pronouns}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Specialization:</strong> {therapist.specialization}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Location:</strong> {therapist.location}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="h6" color="primary" style={{ fontWeight: "normal" }}>
                                                Client Feedbacks
                                            </Typography>
                                            {therapist.reviews.map((review, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    color="textSecondary"
                                                    style={{ fontStyle: "italic" }}
                                                >
                                                    <strong>{review.feedback}</strong> - {review.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleBookSession(therapist)}
                                        fullWidth
                                        style={{
                                            backgroundColor: "#1a73e8",
                                            color: "#fff",
                                            borderRadius: "0 0 15px 15px",
                                            padding: "10px",
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Footer */}
                <Box
                    sx={{
                        backgroundColor: "#F0FFFF", // Warning red shade
                        color: "#FF0000",
                        py: 4,
                        mt: 5,
                        textAlign: "center",
                        borderTop: "3px solid #d32f2f", // Red border for warning
                        fontSize: "14px",
                        fontWeight: "bold",
                    }}
                >
                    <Typography variant="body2">
                        If you are in a life-threatening situation, do not use this site. Call the Suicide and
                        Crisis Lifeline, a free, 24-hour hotline, at <strong>988</strong>. Your call will be
                        routed to the crisis center near you. If your issue is an emergency, call <strong>911</strong>{" "}
                        or go to your nearest emergency room.
                    </Typography>
                </Box>

                {/* Booking Confirmation Dialog */}
                <Dialog open={openBookingDialog} onClose={() => setOpenBookingDialog(false)}>
                    <DialogTitle>Confirm Your Booking</DialogTitle>
                    <DialogContent>
                        <DatePicker
                            label="Date"
                            value={bookingDetails.date}
                            onChange={(newValue) =>
                                setBookingDetails({ ...bookingDetails, date: newValue })
                            }
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <TimePicker
                            label="Time"
                            value={bookingDetails.time}
                            onChange={(newValue) =>
                                setBookingDetails({ ...bookingDetails, time: newValue })
                            }
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            value={bookingDetails.description}
                            onChange={(e) =>
                                setBookingDetails({ ...bookingDetails, description: e.target.value })
                            }
                            sx={{ mb: 2 }}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenBookingDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmBooking} color="primary">
                            Confirm Booking
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
}

export default BookingPage;
