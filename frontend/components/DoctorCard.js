import React from 'react';
import { Card, Typography, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";


const scrollAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;


const DoctorCardContainer = styled(Box)({
    display: "flex",
    gap: "15px",
    padding: "20px",
    margin: "40px 0",
    width: "100%",
    overflow: "hidden",
    animation: `${scrollAnimation} 60s linear infinite`,
    '@media (max-width:600px)': {
        animation: `${scrollAnimation} 3s linear infinite`, // Faster scrolling on smaller screens
    },
});

const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: 200,
    maxWidth: 250,
    borderRadius: "15px",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    scrollSnapAlign: "center",
    position: "relative",
      overflow: "hidden",
    '@media (max-width:600px)': {
        minWidth: 150, // Adjust card size for smaller screens
    },
}));


const ImageBackground = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 1,
    zIndex: 1,
});

const TextContainer = styled(Box)({
    position: "relative",
    zIndex: 2,
    paddingTop: "160px",
    color: "#FFFFFF",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
});

const DoctorCard = ({ name, specialization, location, image }) => (
    <DoctorCardContainer>
       {[1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14].map((i, index) => (
                       <StyledCard key={i}>
                            {/* Background Image */}
                            <ImageBackground
                                component="img"
                                src={`/doc.png`} 
                                alt={`Therapist ${i}`}
                            />   
                            {/* Text Content */}
                            <TextContainer>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Therapist Name {i}</Typography>
                                <Typography variant="body2">Specialization</Typography>
                                <Typography variant="body2">City, Country</Typography>
                            </TextContainer>
                        </StyledCard>
                    ))}
    </DoctorCardContainer>
);

export default DoctorCard;
