import React from 'react'

export default function Appointment() {

    const handlePayment = async (appointmentType) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentType }), // Send appointment type
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert(data.error || 'Something went wrong');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
  return (
    <div>
      appointment
      <br></br>

      <button onClick={() => handlePayment('in-person-session')}>
        Pay for Therapy Session
        </button>
    </div>
  )
}
