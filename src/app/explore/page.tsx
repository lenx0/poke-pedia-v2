import Layout from "@/components/Layout";
import { Box, Typography } from "@mui/material";

export default function Explore() {
    return (
        <Layout>
            <Box 
            sx={{
                textAlign: "center"
            }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { lg: '2rem', xs: '2.2rem' }
                    }}
                >
                    Catálogo Pokémon
                </Typography>
            </Box>
        </Layout>
    );
}
