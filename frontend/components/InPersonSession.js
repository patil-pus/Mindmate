import { useState } from 'react';
import { Modal } from 'react-bootstrap';  // For the modal pop-up calendar
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap for modal styling

const therapists = [
    { id: 1, name: "Dr. Alice Johnson", specialty: "CBT Therapist" },
    { id: 2, name: "Dr. John Smith", specialty: "Anxiety & Depression" },
    { id: 3, name: "Dr. Emma Brown", specialty: "Trauma Specialist" },
    { id: 4, name: "Dr. Michael Lee", specialty: "Family Therapy" },
];

const InPersonSession = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedTherapist, setSelectedTherapist] = useState(null);

    const handleBookSession = (therapist) => {
        setSelectedTherapist(therapist);
        setShowCalendar(true);
    };

    const handleClose = () => setShowCalendar(false);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Book an In-Person Session</h1>
            <div style={styles.mainContent}>
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

                <div style={styles.calendarSection}>
                    <Modal show={showCalendar} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Book Session with {selectedTherapist?.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* You can use any calendar component here. For example, react-calendar */}
                            <div style={styles.calendar}>
                                <p>Select a date for your session:</p>
                                <input type="date" style={styles.datePicker} />
                                <button
                                    style={styles.bookConfirmButton}
                                    onClick={() => alert('Session Booked!')}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal>
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
    calendar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    datePicker: {
        padding: '10px',
        margin: '15px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    bookConfirmButton: {
        backgroundColor: '#005f85',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        border: 'none',
    },
};

export default InPersonSession;
