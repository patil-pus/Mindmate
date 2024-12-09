import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

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
        <h1 style={styles.title}>
          <span role="img" aria-label="party">
            🎉
          </span>{" "}
          Payment Successful!
        </h1>
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

// Updated Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #83a4d4, #b6fbff)",
    overflow: "hidden",
    animation: "fadeIn 1s ease-in-out",
  },
  card: {
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "50px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    animation: "slideUp 0.8s ease-in-out",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2ecc71",
    fontFamily: "'Poppins', sans-serif",
    animation: "zoomIn 0.8s ease-in-out",
  },
  message: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#444",
    fontFamily: "'Poppins', sans-serif",
  },
  details: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#666",
    fontFamily: "'Roboto', sans-serif",
  },
  button: {
    display: "inline-block",
    padding: "12px 30px",
    background: "linear-gradient(135deg, #2ecc71, #27ae60)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "transform 0.3s, box-shadow 0.3s",
    fontFamily: "'Poppins', sans-serif",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "@keyframes slideUp": {
    from: { transform: "translateY(50px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  "@keyframes zoomIn": {
    from: { transform: "scale(0.5)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
  },
};

// Add hover effects to the button
styles.button[":hover"] = {
  transform: "scale(1.1)",
  boxShadow: "0 5px 15px rgba(39, 174, 96, 0.3)",
};
