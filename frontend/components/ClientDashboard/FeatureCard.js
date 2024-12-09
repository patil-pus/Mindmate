import React from "react";
import {
  Card,
  Typography,
  CardContent,
  Avatar,
  Button,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledFeatureCard = styled(Card)(({ theme }) => ({
  minWidth: 300,
  maxWidth: 450,
  borderRadius: "20px",
  backgroundColor: theme.palette.background.paper,
  border: "1px solid #ddd",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  scrollSnapAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  fontSize: "1.5rem",
  width: 60,
  height: 60,
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 3),
  borderRadius: "25px",
  fontSize: "0.9rem",
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const FeatureCard = ({
  icon,
  title,
  description,
  image,
  buttonText,
  onClick,
}) => (
  <StyledFeatureCard>
    <StyledAvatar>{icon}</StyledAvatar>
    <Typography
      variant="h6"
      align="center"
      gutterBottom
      sx={{
        fontWeight: 600, 
      }}
    >
      {title}
    </Typography>
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        marginTop: "10px",
        height: "300px",
        width: "100%",
        borderRadius: "15px",
        objectFit: "cover",
      }}
    />
    <CardContent>
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "text.secondary",
          marginTop: "10px",
          fontSize: "1rem", // Set the font size explicitly
          fontWeight: 600, // Optionally adjust the weight
        }}
      >
        {description}
      </Typography>
    </CardContent>
    <StyledButton onClick={onClick}>{buttonText}</StyledButton>
  </StyledFeatureCard>
);

export default FeatureCard;
