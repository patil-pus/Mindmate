import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function Success() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set `isClient` to true after hydration
    setIsClient(true);
  }, []);

  return (
    <div style={styles.container}>
      {/* Render Confetti only on the client */}
      {isClient && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your payment. Your booking has been confirmed.
        </p>
        <p style={styles.details}>
          Check your email for the receipt and more details about your session.
        </p>
        <a href="/Dashboard" style={styles.button}>
          Back to Home
        </a>
      </div>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  card: {
    textAlign: 'center',
    background: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    zIndex: 10,
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  message: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#555',
  },
  details: {
    fontSize: '14px',
    marginBottom: '20px',
    color: '#777',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
};
