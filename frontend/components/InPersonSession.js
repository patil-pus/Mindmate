'use client';
import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';

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
    //const { user, clientData, therapists,loading , error } = useGlobal();

// Sample Therapist Data
const therapists = [
    {
        id: 1,
        name: "Dr. Emily Rodriguez",
        pronouns: "She/Her",
        specialization: "Anxiety & Stress Management",
        area: "Beacon Hill",
        feedbacks: [
            "Helped me understand my triggers and develop coping strategies.",
            "Extremely compassionate and provides a safe, non-judgmental space."
        ],
        popularityScore: 4.8
    },
    {
        id: 2,
        name: "Alex Kim",
        pronouns: "They/Them",
        specialization: "LGBTQ+ Counseling",
        area: "Downtown Boston",
        feedbacks: [
            "Created a welcoming environment that made me feel truly understood.",
            "Insightful perspectives that helped me navigate personal challenges ."
        ],
        popularityScore: 4.5
    },
    {
        id: 3,
        name: "Raj Kapoor",
        pronouns: "He/Him",
        specialization: "Relationship and Couples Counseling",
        area: "North End",
        feedbacks: [
            "We started couples counseling at a point where we couldn't see a future together. Over months, we learned how to listen and communicate better. Our therapist helped us reflect on ourselves and realize we both needed to change to make our relationship work.",
            "My partner and I sought help to reconnect. Our therapist helped us become more positive with each other and voice our struggles. We felt safe and genuinely cared for."
        ],
        popularityScore: 4.9
    }
    ,
    {
        id: 4,
        name: "Maggie Wheeler",
        pronouns: "She/Her",
        specialization: "Grief Counseling",
        area: "Mission Hill",
        feedbacks: [
            "Dr. Maggie helped me with my intense grief and tragic loss by listening to my soul anguish, and then she gave me specific things to do when the waves start to pull me under.",
            "I was provided with a safe space by Dr. Maggie that I desperately needed during a very dark time. I had no idea what to expect, but I can say for sure that her counseling saved my life."
        ],
        popularityScore: 4.1
    }
];

const CustomCalendar = ({ onDateSelect, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);


    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const generateCalendarDays = () => {
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        // Add actual days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
            );

            // Disable past dates
            const isPastDate = date < new Date().setHours(0,0,0,0);
            days.push({ day, isPastDate, date });
        }

        return days;
    };

    const handleDateSelect = (dateObj) => {
        if (dateObj && !dateObj.isPastDate) {
            setSelectedDay(dateObj.day);
            onDateSelect(dateObj.date);
        }
    };

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
        setSelectedDay(null);
    };

    const calendarDays = generateCalendarDays();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => changeMonth(-1)}
                    className="text-teal-600 hover:bg-teal-50 p-2 rounded"
                >
                    ←
                </button>
                <h3 className="text-xl font-semibold text-teal-800">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                    onClick={() => changeMonth(1)}
                    className="text-teal-600 hover:bg-teal-50 p-2 rounded"
                >
                    →
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {weekdays.map(day => (
                    <div key={day} className="text-xs text-gray-500 font-medium">{day}</div>
                ))}

                {calendarDays.map((dateObj, index) => (
                    <div
                        key={index}
                        className={`
              p-2 
              ${dateObj ?
                            (dateObj.isPastDate ?
                                'text-gray-300 cursor-not-allowed' :
                                'hover:bg-teal-100 cursor-pointer') :
                            ''
                        }
              ${selectedDay === dateObj?.day ? 'bg-teal-500 text-white' : ''}
              rounded text-center
            `}
                        onClick={() => handleDateSelect(dateObj)}
                    >
                        {dateObj ? dateObj.day : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

const MindMateBooking = () => {
    const [step, setStep] = useState(0);
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const [bookingTime, setBookingTime] = useState('');
    const [description, setDescription] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM',
        '1:00 PM', '2:00 PM', '3:00 PM',
        '4:00 PM', '5:00 PM'
    ];

    const handleTherapistSelect = (therapist) => {
        setSelectedTherapist(therapist);
        setStep(1);
    };

    const handleBookingConfirm = () => {
        setStep(2);
        setIsConfirmed(true);
    };

    const renderStep = () => {
        switch(step) {
            case 0:
                return (
                    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
                        <h1 className="text-4xl font-bold text-center text-teal-800 mb-6 drop-shadow-md">
                            MindMate: Your Mental Wellness Journey
                        </h1>

                        <p className="text-center text-teal-700 max-w-2xl mx-auto mb-8">
                            Connect with compassionate professionals who understand your unique mental health needs.
                            Our carefully curated therapists are here to support you through lifes challenges.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {therapists.map((therapist) => (
                                <div
                                    key={therapist.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
                                >
                                    <div className="p-6">
                                        <h2 className="text-2xl font-semibold text-teal-800 mb-2">
                                            {therapist.name}
                                        </h2>
                                        <p className="text-gray-600 mb-1">
                                            {therapist.pronouns}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-semibold">Specialization:</span> {therapist.specialization}
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-semibold">Area:</span> {therapist.area}
                                        </p>
                                        <div className="mb-4">
                                            <span className="font-semibold block mb-1">Client Feedbacks:</span>
                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                {therapist.feedbacks.map((feedback, index) => (
                                                    <li key={index} className="mb-1">{feedback}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex items-center mb-4">
                      <span className="text-gray-700">
                        Rating: {therapist.popularityScore} / 5.0
                      </span>
                                        </div>
                                        <button
                                            onClick={() => handleTherapistSelect(therapist)}
                                            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                                        >
                                            Book Session
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-8">
                        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-3xl font-bold text-teal-800 mb-6">
                                    Book Session with {selectedTherapist.name}
                                </h2>

                                <CustomCalendar
                                    onDateSelect={(date) => setBookingDate(date)}
                                    selectedDate={bookingDate}
                                />
                            </div>

                            <div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Selected Date</label>
                                        <input
                                            type="text"
                                            value={bookingDate ? bookingDate.toLocaleDateString() : ''}
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Time Slot</label>
                                        <select
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        >
                                            <option value="">Select a time</option>
                                            {timeSlots.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Session Description</label>
                                        <textarea
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Briefly describe what you'd like to discuss in your session..."
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleBookingConfirm}
                                        disabled={!bookingDate || !bookingTime || !description}
                                        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md">
                            <Check className="mx-auto text-green-500 text-6xl mb-4" />
                            <h2 className="text-2xl font-bold text-teal-800 mb-4">
                                Booking Confirmed! 🎉
                            </h2>
                            <div className="text-gray-700 mb-6">
                                <p>Therapist: {selectedTherapist.name}</p>
                                <p>Date: {bookingDate.toLocaleDateString()}</p>
                                <p>Time: {bookingTime}</p>
                            </div>
                            <button
                                onClick={() => setStep(0)}
                                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
                            >
                                Back to Therapists
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
            {renderStep()}
        </div>
    );
};
}

export default MindMateBooking;