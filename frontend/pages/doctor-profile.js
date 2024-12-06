import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { useGlobal } from "../contexts/GlobalContext";

const DoctorProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const { therapists } = useGlobal();

    if (!therapists || !id) {
        return <Typography>Loading...</Typography>;
    }

    const doctor = therapists.find((therapist) => therapist.id === parseInt(id));

    if (!doctor) {
        return (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Typography variant="h4">Doctor not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <Card sx={{ padding: "20px", borderRadius: "15px" }}>
                <Avatar
                    src={doctor.image_url || "/default-avatar.png"} // Use a default image if `image_url` is NULL
                    alt={doctor.name}
                    sx={{ width: "150px", height: "150px", margin: "auto", mb: 2 }}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {doctor.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Specialization: {doctor.specialization || "Not specified"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Language: {doctor.language || "Not specified"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Location: {doctor.location || "Not specified"}
                </Typography>
            </Card>
        </Box>
    );
};

export default DoctorProfile;
