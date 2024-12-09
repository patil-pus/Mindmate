import React from 'react';
import { Card, Typography, CardContent, Avatar, Button, CardMedia } from "@mui/material";
import { styled } from "@mui/system";

const StyledFeatureCard = styled(Card)(({ theme }) => ({
    minWidth: 300,
    maxWidth: 450,
    borderRadius: "15px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    scrollSnapAlign: "center",
}));

const FeatureCard = ({ icon, title, description, image, buttonText, onClick }) => (
    <StyledFeatureCard>
        <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>{icon}</Avatar>
        <Typography variant="h6">{title}</Typography>
        <CardContent>
            <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
                marginTop: "10px",
                height: "300px",
                width: "100%",
                objectFit: "cover",
            }}
        />
        <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={onClick} // Add the onClick handler
        >
            {buttonText}
        </Button>
    </StyledFeatureCard>
);

export default FeatureCard;
