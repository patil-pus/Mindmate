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

    const handleBookSession = (therapist) => {
        setSelectedTherapist(therapist);
    };

    const handleDateSelect = (e) => {
        setSelectedDate(e.target.value);
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

                {/* Calendar Section */}
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
                                />
                                {selectedDate && (
                                    <div style={styles.selectedDate}>
                                        <p>Selected Date: {selectedDate}</p>
                                    </div>
                                )}
                            </div>
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
};

export default InPersonSession;
