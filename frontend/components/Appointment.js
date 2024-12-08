import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function Appointment() {
  const handlePayment = async (appointmentType) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentType }), // Send appointment type
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f4f6, #e3e9f7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#1a73e8" }}
          >
            You're just one step away!
          </Typography>
          <Box sx={{ marginBottom: 4 }}>
            <Image
              src="/inperson.webp" // Image path
              alt="In-Person Therapy"
              width={400} // Set appropriate width
              height={300} // Set appropriate height
              style={{
                borderRadius: "8px", // Optional: Rounded corners
                objectFit: "cover", // Ensure the image fits nicely
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{ marginBottom: 4, color: "#555", lineHeight: 1.6 }}
          >
            Book your in-person therapy session
            now. Payment is secure and handled via Stripe Checkout.
          </Typography>
          <Button
            variant="contained"
            onClick={() => handlePayment("in-person-session")}
            sx={{
              padding: "10px 20px",
              backgroundColor: "#1a73e8",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "#1665c1",
              },
            }}
          >
            Pay for Therapy Session
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
