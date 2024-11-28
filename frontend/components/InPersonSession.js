import { useState } from 'react';

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

    // Get the current date in yyyy-mm-dd format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Book an In-Person Session</h1>
            <div style={styles.mainContent}>
                {/* Therapist List */}
                <div style={styles.therapistsList}>
                    <h3 style={styles.subtitle}>Our Therapists</h3>
                    <ul style={styles.list}>
                        {therapists.map((therapist) => (
                            <li key={therapist.id} style={styles.therapistItem}>
                                <h4>{therapist.name}</h4>
                                <p>{therapist.specialty}</p>
                                <button
                                    style={styles.bookButton}
                                    onClick={() => handleBookSession(therapist)}
                                >
                                    Book Session
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Calendar and Booking Section */}
                <div style={styles.calendarSection}>
                    {selectedTherapist && (
                        <div>
                            <h3 style={styles.calendarTitle}>
                                Book Session with {selectedTherapist.name}
                            </h3>
                            <p style={styles.calendarDescription}>Select a date for your session:</p>

                            {/* Calendar Component */}
                            <div style={styles.calendarWrapper}>
                                <input
                                    type="date"
                                    value={selectedDate || ''}
                                    onChange={handleDateSelect}
                                    style={styles.datePicker}
                                    min={getCurrentDate()}  // Prevent older dates
                                />
                                {selectedDate && (
                                    <div style={styles.selectedDate}>
                                        <p>Selected Date: {selectedDate}</p>
                                    </div>
                                )}
                            </div>

                            {/* Time Selection */}
                            <div style={styles.timeSelector}>
                                <label style={styles.label}>Select Time:</label>
                                <select
                                    value={selectedTime}
                                    onChange={handleTimeSelect}
                                    style={styles.timeSelect}
                                >
                                    <option value="">--Select a time--</option>
                                    {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                                        <option key={hour} value={`${hour}:00`}>
                                            {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Client Notes */}
                            <div style={styles.clientNotesWrapper}>
                                <label style={styles.label}>Session Description or Client Notes:</label>
                                <textarea
                                    value={clientNotes}
                                    onChange={handleClientNotesChange}
                                    style={styles.textarea}
                                    placeholder="Add any notes or description for your session"
                                />
                            </div>

                            {/* Confirm Booking Button */}
                            <div style={styles.confirmWrapper}>
                                <button
                                    style={styles.confirmButton}
                                    onClick={handleConfirmBooking}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Booking Confirmation Information */}
                    {bookingConfirmed && (
                        <div style={styles.bookingDetails}>
                            <h3 style={styles.bookingTitle}>Booking Confirmed!</h3>
                            <p style={styles.bookingInfo}>
                                Therapist: {selectedTherapist.name}
                            </p>
                            <p style={styles.bookingInfo}>
                                Date: {selectedDate}
                            </p>
                            <p style={styles.bookingInfo}>
                                Time: {selectedTime}
                            </p>
                            <p style={styles.bookingInfo}>
                                Notes: {clientNotes}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f4f7fb',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: '36px',
        marginBottom: '20px',
    },
    mainContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    therapistsList: {
        width: '40%',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    subtitle: {
        fontSize: '24px',
        color: '#005f85',
        marginBottom: '10px',
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
        backgroundColor: '#005f85',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    calendarSection: {
        width: '55%',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    calendarWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    calendarTitle: {
        fontSize: '28px',
        color: '#333',
        marginBottom: '10px',
    },
    calendarDescription: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '20px',
    },
    datePicker: {
        padding: '15px',
        fontSize: '18px',
        width: '250px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    selectedDate: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
        fontWeight: 'bold',
    },
    timeSelector: {
        marginTop: '20px',
    },
    timeSelect: {
        padding: '10px',
        fontSize: '18px',
        width: '250px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    clientNotesWrapper: {
        marginTop: '20px',
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        height: '150px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        resize: 'vertical',
    },
    confirmWrapper: {
        marginTop: '20px',
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#005f85',
        color: '#fff',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px',
    },
    bookingDetails: {
        marginTop: '20px',
    },
    bookingTitle: {
        fontSize: '28px',
        color: '#28a745',
    },
    bookingInfo: {
        fontSize: '18px',
        color: '#333',
    },
};

export default InPersonSession;
