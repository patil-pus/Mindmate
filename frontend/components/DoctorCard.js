import React from 'react';
import { Card, Typography, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useGlobal } from "../contexts/GlobalContext";
import FeatureCard from "./FeatureCard";
import { useRouter } from 'next/router';
 

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

const DoctorCard = () => {
  const { therapists, error } = useGlobal();
  const router = useRouter();

  if (error) {
      return (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
              <Typography variant="h6" color="error">
                  Error loading therapists: {error}
              </Typography>
          </Box>
      );
  }

  if (!therapists || therapists.length === 0) {
      return (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
              <Typography variant="h6">No therapists available.</Typography>
          </Box>
      );
  }

  const handleLearnMore = (id) => {
      router.push(`/doctor-profile?id=${id}`);
  };

  return (
      <DoctorCardContainer>
          {therapists.map((therapist) => (
              <FeatureCard
                  key={therapist.id}
                  icon="D"
                  title={`${therapist.name}`}
                  description={`Specialization: ${therapist.specialization} - Language: ${therapist.language}`}
                  image={therapist.imageUrl}
                  buttonText="Learn More"
                  onClick={() => handleLearnMore(therapist.id)}
              />
          ))}
      </DoctorCardContainer>
  );
};


export default DoctorCard;
