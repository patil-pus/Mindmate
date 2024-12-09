import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useGlobal } from "../../contexts/GlobalContext";

const Logout = () => {
    const router = useRouter();
const {logout} = useGlobal()
    useEffect(() => {
        // Simulate logout action
        setTimeout(() => {
            router.push("/SignIn"); // Redirect to sign-in page
        }, 2000);
        logout()
    }, [router]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress />
            <Typography variant="h6" mt={2}>
                Logging out...
            </Typography>
        </Box>
    );
};

export default Logout;
