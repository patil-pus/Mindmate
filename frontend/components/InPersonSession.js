import { useState } from 'react';
import { Button, TextField, Grid, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Sample therapist list
const therapists = [
    { id: 1, name: "Dr. Alice Johnson", specialty: "CBT Therapist" },
    { id: 2, name: "Dr. John Smith", specialty: "Anxiety & Depression" },
    { id: 3, name: "Dr. Emma Brown", specialty: "Trauma Specialist" },
    { id: 4, name: "Dr. Michael Lee", specialty: "Family Therapy" },
];

const InPersonSession = () => {
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [clientNotes, setClientNotes] = useState('');
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const handleBookSession = (therapist) => {
        setSelectedTherapist(therapist);
        setBookingConfirmed(false); // Reset booking confirmation
    };

    const handleDateSelect = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeSelect = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleClientNotesChange = (e) => {
        setClientNotes(e.target.value);
    };

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedTime || !clientNotes) {
            alert("Please fill in all the details to confirm your booking.");
            return;
        }
        setBookingConfirmed(true);
    };

    // Get current date in yyyy-mm-dd format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div style={styles.container}>
            <Typography variant="h3" gutterBottom style={styles.title}>
                Book an In-Person Session
            </Typography>
            <Grid container spacing={4}>
                {/* Therapist List */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={styles.card}>
                        <CardContent>
                            <Typography variant="h5" style={styles.cardTitle}>Our Therapists</Typography>
                            <div style={styles.list}>
                                {therapists.map((therapist) => (
                                    <div key={therapist.id} style={styles.therapistItem}>
                                        <Typography variant="h6">{therapist.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">{therapist.specialty}</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={styles.bookButton}
                                            onClick={() => handleBookSession(therapist)}
                                        >
                                            Book Session
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Calendar and Booking Section */}
                <Grid item xs={12} sm={6} md={8}>
                    {selectedTherapist && (
                        <Card style={styles.card}>
                            <CardContent>
                                <Typography variant="h5" style={styles.calendarTitle}>
                                    Book Session with {selectedTherapist.name}
                                </Typography>
                                <Typography variant="body1" style={styles.calendarDescription}>
                                    Select a date for your session:
                                </Typography>

                                {/* Date Picker */}
                                <TextField
                                    label="Select Date"
                                    type="date"
                                    value={selectedDate || ''}
                                    onChange={handleDateSelect}
                                    style={styles.datePicker}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ min: getCurrentDate() }}  // Prevent older dates
                                />

                                {selectedDate && (
                                    <Typography variant="body1" style={styles.selectedDate}>
                                        Selected Date: {selectedDate}
                                    </Typography>
                                )}

                                {/* Time Selection */}
                                <FormControl fullWidth style={styles.timeSelector}>
                                    <InputLabel>Select Time</InputLabel>
                                    <Select
                                        value={selectedTime}
                                        onChange={handleTimeSelect}
                                        label="Select Time"
                                    >
                                        {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                                            <MenuItem key={hour} value={`${hour}:00`}>
                                                {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Client Notes */}
                                <TextField
                                    label="Session Description or Client Notes"
                                    value={clientNotes}
                                    onChange={handleClientNotesChange}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    style={styles.textarea}
                                    variant="outlined"
                                />

                                {/* Confirm Booking Button */}
                                <div style={styles.confirmWrapper}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={styles.confirmButton}
                                        onClick={handleConfirmBooking}
                                    >
                                        Confirm Booking
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Booking Confirmation */}
                    {bookingConfirmed && (
                        <Card style={styles.card}>
                            <CardContent>
                                <Typography variant="h5" color="success" style={styles.bookingTitle}>
                                    Booking Confirmed!
                                </Typography>
                                <Typography variant="body1" style={styles.bookingInfo}>
                                    Therapist: {selectedTherapist.name}
                                </Typography>
                                <Typography variant="body1" style={styles.bookingInfo}>
                                    Date: {selectedDate}
                                </Typography>
                                <Typography variant="body1" style={styles.bookingInfo}>
                                    Time: {selectedTime}
                                </Typography>
                                <Typography variant="body1" style={styles.bookingInfo}>
                                    Notes: {clientNotes}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#005f85',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
        color: '#005f85',
        fontSize: '24px',
        marginBottom: '15px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    therapistItem: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
    },
    bookButton: {
        marginTop: '10px',
    },
    calendarTitle: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '15px',
    },
    calendarDescription: {
        color: '#555',
        marginBottom: '20px',
    },
    datePicker: {
        width: '100%',
        marginBottom: '20px',
    },
    selectedDate: {
        fontSize: '16px',
        color: '#333',
        fontWeight: 'bold',
    },
    timeSelector: {
        marginBottom: '20px',
    },
    textarea: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    confirmWrapper: {
        textAlign: 'center',
    },
    confirmButton: {
        padding: '10px 20px',
        fontSize: '16px',
    },
    bookingTitle: {
        color: '#28a745',
        fontSize: '24px',
    },
    bookingInfo: {
        fontSize: '16px',
        color: '#333',
    },
};

export default InPersonSession;
