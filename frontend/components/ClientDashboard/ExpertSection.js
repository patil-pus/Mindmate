import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const SectionContainer = styled(Box)({
    textAlign: "center",
    padding: "40px 20px",
});

const Heading = styled(Typography)({
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333", // Dark color for the heading
    marginBottom: "20px",
});

const SubHeading = styled(Typography)({
    fontSize: "1.1rem",
    color: "#555", // Slightly lighter color for the subheading
    maxWidth: "600px",
    margin: "0 auto",
    marginBottom: "30px",
    lineHeight: "1.5",
});

const StyledButton = styled(Button)({
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#333", // Dark background for the button
    color: "#fff",
    borderRadius: "20px",
    "&:hover": {
        backgroundColor: "#555",
    },
});

const ExpertSection = () => {
    return (
        <SectionContainer>
            <Heading variant="h2">Designed by experts, delivered with care</Heading>
            <SubHeading variant="body1">
                From guided meditations to one-on-one coaching, our team of clinical experts and trained coaches work together to bring you science-backed care.
            </SubHeading>
            <StyledButton variant="contained">Meet our experts</StyledButton>
        </SectionContainer>
    );
};

export default ExpertSection;
