import React from 'react';
import { Card, Typography, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useGlobal } from "../../contexts/GlobalContext";
import FeatureCard from "./FeatureCard";
import { useRouter } from 'next/router';
 
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
    <div>
    <marquee >
        <div style={{display:"flex", gap:"25px" }} >

          {therapists.map((therapist) => (
              <FeatureCard
                  key={therapist.id}
                  icon="D"
                  title={`${therapist.name}`}
                  description={`Specialization: ${therapist.specialization} - Language: ${therapist.language}`}
                  image={therapist.imageUrl || "/R.png"}
                  buttonText="Learn More"
                  onClick={() => handleLearnMore(therapist.id)}
              />
          ))}
          </div>
    </marquee>
    </div>
    
  );
};


export default DoctorCard;
